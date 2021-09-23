import spacy
from spacy import displacy
from spacy.symbols import oprd, acl, dobj, pobj, prep, VERB, ADP, NOUN
from spacy.tokens import Token


# Load English tokenizer, tagger, parser and NER
nlp = spacy.load("en_core_web_sm")
compound = nlp.vocab.strings["compound"]

phrases = [
    ("Create a new terminator named User", """{'terminator': {'name': 'User'}}"""), 
    ("Create a terminator named User", """{'terminator': {'name': 'User'}}"""),
    ("Create a terminator named as User", """{'terminator': {'name': 'User'}}"""),
    ("Create a terminator with name equal to User", """{'terminator': {'name': 'User'}}"""),
    ("Create a terminator with its name as User", """{'terminator': {'name': 'User'}}"""),
    ("Create a terminator with its name as Store Owner", """{'terminator': {'name': 'Store Owner'}}""")
]


def chunk_getter(token): 
  comp = get_children_with_relation(token, compound)
  if comp:
    return chunk_getter(comp[0]) + " " + token.text
  else:
    return token.text

Token.set_extension("chunk", getter=chunk_getter)

# These functions can be transformed to extensions Token.set_extension CLASSMETHOD
def get_next_token(token):
    list = [t for t in token.rights]
    if list:
        return list[0]
    return None


def get_children_of_type(token, type):
    return [t for t in token.children if t.pos == type]


def get_children_with_relation(token, relation):
    return [t for t in token.children if t.dep == relation]


def get_children_of_type_and_relation(token, type, relation):
    return [t for t in token.children if t.pos == type and t.dep == relation]


def get_verb_property_value(verb):
    values = [l.text for l in get_children_with_relation(verb, oprd)]
    values += [
        c.text for l in verb.children if l.text == "as" for c in l.children
        if c.dep == pobj
    ]
    return values


def get_noun_verb_properties(noun):
    return {
        c.lemma_: get_verb_property_value(c)[0]
        for c in get_children_of_type_and_relation(noun, VERB, acl)
    }


def get_noun_value(noun):
    next_token = get_next_token(noun)
    if next_token != None and next_token.text == "as":
        return get_next_token(get_next_token(noun))._.chunk
    if next_token != None and next_token.text == "equal":
        return get_next_token(get_next_token(get_next_token(noun)))._.chunk
    return ""


def get_noun_with_properties(noun, verb):
    next_token = get_next_token(noun)
    if next_token == None:
        verb_aux_props = get_children_of_type_and_relation(verb, ADP, prep)
        if verb_aux_props:
            next_token = verb_aux_props[0]
        else:
            return {}
    if next_token.text == "with":
        attrs = get_children_of_type_and_relation(next_token, NOUN, pobj)
        return {c.text: get_noun_value(c) for c in attrs}

    return {}


class CreateAction:
    def __init__(self, verb):
        self.verb = verb
        self.create_what = self.__define_what()
        self.properties = self.__define_content()

    def __define_what(self):
        possibilities = get_children_with_relation(self.verb, dobj)
        if len(possibilities) > 0:
            return possibilities[0]
        raise Exception("Cannot define what is to be created")

    def __define_content(self):
        verb_props = get_noun_verb_properties(self.create_what)
        with_props = get_noun_with_properties(self.create_what, self.verb)
        return {**verb_props, **with_props}

    def __str__(self):
        return str({self.create_what.text: self.properties})


def get_verbs(doc):
    return [token for token in doc if token.pos == VERB]


def define_action(doc):
    verbs = get_verbs(doc)
    # We need to define a list of possible actions
    # By now we are only working with creation actions
    has_create = [token for token in verbs if token.lemma_ == "create"]
    if has_create:
        return CreateAction(has_create[0])


for p in phrases:
    # Process whole documents
    text = (p[0])
    doc = nlp(text)

    # Analyze syntax
    displacy.render(doc, style="dep")
    print(p[0])
    result = str(define_action(doc))
    print("Result:", p[1] == result, result)
