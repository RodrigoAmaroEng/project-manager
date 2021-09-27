from os import system
import spacy
from spacy import displacy
from spacy.symbols import oprd, acl, dobj, pobj, prep, conj, attr, npadvmod, appos, VERB, ADP, NOUN, PROPN, ADJ, ADV, NUM
from spacy.tokens import Token
from spacy.matcher import Matcher
from clint.textui import puts, indent, colored

# Load English tokenizer, tagger, parser and NER
nlp = spacy.load("en_core_web_sm")
compound = nlp.vocab.strings["compound"]

# EXTENSIONS
# ===============================================


def chunk_getter(token):
    comp = get_children_with_relation(token, compound)
    if comp:
        return chunk_getter(comp[0]) + " " + token.text
    else:
        return token.text


if not Token.has_extension("chunk"):
    Token.set_extension("chunk", getter=chunk_getter)


def get_next_token(token):
    list = [t for t in token.rights]
    if list:
        return list[0]
    return None


if not Token.has_extension("next"):
    Token.set_extension("next", getter=get_next_token)


def get_prev_token(token):
    list = [t for t in token.lefts]
    if list:
        return list[0]
    return None


if not Token.has_extension("prev"):
    Token.set_extension("prev", getter=get_prev_token)


def get_verb_property_value(verb):
    values = [l.text for l in get_children_with_relation(verb, oprd)]
    values += [
        c.text for l in verb.children if l.text == "as" for c in l.children
        if c.dep == pobj
    ]
    return values


if not Token.has_extension("verb_value"):
    Token.set_extension("verb_value", getter=get_verb_property_value)


def get_noun_verb_properties(noun):
    return {
        c.lemma_: c._.verb_value[0]
        for c in get_children_of_type_and_relation(noun, VERB, acl)
    }


if not Token.has_extension("verb_properties"):
    Token.set_extension("verb_properties", getter=get_noun_verb_properties)


def get_noun_value(noun):
    next_token = noun._.next
    if next_token != None and next_token.text == "as":
        return noun._.next._.next._.chunk
    if next_token != None and next_token.text == "equal":
        return noun._.next._.next._.next._.chunk
    return ""


if not Token.has_extension("noun_value"):
    Token.set_extension("noun_value", getter=get_noun_value)

# AUX METHODS
# ===============================================


def get_children_of_type(token, type):
    return [t for t in token.children if t.pos == type]


def get_children_with_relation(token, relation):
    return [t for t in token.children if t.dep == relation]


def get_children_of_type_and_relation(token, type, relation):
    return [t for t in token.children if t.pos == type and t.dep == relation]


def get_noun_with_properties(noun, verb):
    next_token = noun._.next
    if next_token == None:
        verb_aux_props = get_children_of_type_and_relation(verb, ADP, prep)
        if verb_aux_props:
            next_token = verb_aux_props[0]
        else:
            return {}
    if next_token.text == "with":
        definitions = get_children_of_type_and_relation(next_token, ADP, conj)
        definitions.append(next_token)
        attrs = []
        for d in definitions:
            attrs += get_children_of_type_and_relation(d, NOUN, pobj)
        return {c.text: c._.noun_value for c in attrs}

    return {}


matcher = Matcher(nlp.vocab)
# Add match ID "HelloWorld" with no callback and one pattern
pat0 = [{'POS': 'NOUN'}, {'LOWER': "as"}, {'DEP': {'IN': ['pobj', 'amod']}}]
pat3 = [{
    'POS': 'NOUN'
}, {
    'LOWER': {
        'IN': ['is', 'of']
    },
}, {
    'POS': {
        'IN': ['PROPN', 'NUM', 'NOUN']
    },
    'OP': '+'
}]
pat4 = [{
    'POS': 'NOUN'
}, {
    'LOWER': "as",
    "OP": "?"
}, {
    'POS': 'PROPN',
    'OP': '+'
}]
pat5 = [{
    'POS': 'VERB'
}, {
    'LOWER': {
        "IN": ["as", "it"]
    },
    "OP": "?"
}, {
    'POS': 'PROPN',
    'OP': '+'
}]
pat7 = [{
    'POS': 'VERB'
}, {
    'POS': "NOUN",
    "DEP": "dobj"
}, {
    'POS': 'PROPN',
    "DEP": "appos",
    'OP': '+'
}]
pat8 = [{'POS': 'NOUN'}, {'LOWER': "equal"}, {'LOWER': "to"}, {'DEP': 'pobj'}]
matcher.add("propertiesPattern", [pat0, pat3, pat4, pat5, pat7, pat8])

# TEST CASES
# ===============================================

phrases = [
    ("Create a new terminator named User",
     """{'terminator': {'name': 'User'}}"""),
    ("Create a terminator named User", """{'terminator': {'name': 'User'}}"""),
    ("Create a terminator named as User",
     """{'terminator': {'name': 'User'}}"""),
    ("Create a terminator with name equal to User",
     """{'terminator': {'name': 'User'}}"""),
    ("Create a terminator with its name as User",
     """{'terminator': {'name': 'User'}}"""),
    ("Create a terminator with its name as Store Owner",
     """{'terminator': {'name': 'Store Owner'}}"""),
    ("Create a terminator whose name is User",
     """{'terminator': {'name': 'User'}}"""),
    ("Create a terminator and name it User",
     """{'terminator': {'name': 'User'}}"""),
    ("Create a terminator and then name it User",
     """{'terminator': {'name': 'User'}}"""),
    ("Create a terminator which is named User",
     """{'terminator': {'name': 'User'}}"""),
    # Two properties
    ("Create a terminator with name equal to User and with level equal to high",
     """{'terminator': {'name': 'User', 'level': 'high'}}"""),
    ("Create a terminator with name equal to User and level equal to high",
     """{'terminator': {'name': 'User', 'level': 'high'}}"""),
    ("Create a terminator with name as User and level as high",
     """{'terminator': {'name': 'User', 'level': 'high'}}"""),
    ("Create a terminator with the following properties: name equal to User, and level equal to high",
     """{'terminator': {'name': 'User', 'level': 'high'}}"""),
    ("Create an Actor named John with age of 28",
     """{'Actor': {'name': 'John', 'age': '28'}}"""),
    ("Create an Actor whose name is John and age is 28",
     """{'Actor': {'name': 'John', 'age': '28'}}"""),
    ("Create an Actor which has the name John and the age of 28",
     """{'Actor': {'name': 'John', 'age': '28'}}"""),
    # Three or more properties
    ("Create an Actor which has the name John, the role of manager and the age of 28",
     """{'Actor': {'name': 'John', 'role': 'manager', 'age': '28'}}"""),
]

# CODE SOLUTION
# ===============================================


class CreateAction:
    def __init__(self, verb, matches, doc):
        self.verb = verb
        self.create_what = self.__define_what()
        self.properties = self.__define_content(matches, doc)

    def __define_what(self):
        possibilities = get_children_with_relation(self.verb, dobj)
        if len(possibilities) > 0:
            return possibilities[0]
        raise Exception("Cannot define what is to be created")

    def __define_props(self, tokens):
        return [
            p for p in tokens if (p.pos == NOUN and p.head.text != "of") or (
                p.pos == VERB and p.lemma_ != "be")
        ]

    def __define_values(self, tokens):
        return [
            p for p in tokens if (p.pos in [PROPN, ADJ, NUM]) and
            (p.dep in [pobj, oprd, attr, npadvmod, appos]) or (
                p.pos == ADJ and p.head.pos == ADV) or (p.pos == NOUN and p.head.text == "of")
        ]

    def __define_content(self, matches, doc):
        # verb_props = self.create_what._.verb_properties
        # with_props = get_noun_with_properties(self.create_what, self.verb)
        props = []
        values = []
        for id, s, e in matches:
            tokens = doc[s:e]
            # print([(t, t.dep_) for t in tokens])
            for p in self.__define_props(tokens):
                if p not in props:
                    props.append(p)
            for p in self.__define_values(tokens):
                if p not in values:
                    values.append(p)
        # print(props)
        # print(values)

        return dict(zip([f.lemma_ for f in props],
                        [f._.chunk for f in values]))

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
        matches = matcher(doc)
        return CreateAction(has_create[0], matches, doc)


for p in phrases:
    # Process whole documents
    text = (p[0])
    doc = nlp(text)

    # Analyze syntax
    with indent(0, quote="> "):
        puts(colored.cyan(text))
    result = str(define_action(doc))
    color = colored.red
    if p[1] == result:
        color = colored.green
    else:
        puts("Output: " + colored.yellow(result))
        displacy.render(doc, style="dep")
    puts("Success: " + color(p[1] == result))
    print()
