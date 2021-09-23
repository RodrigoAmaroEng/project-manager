import spacy

# Load English tokenizer, tagger, parser and NER
nlp = spacy.load("en_core_web_sm")
phrases = [
    "Create a new terminator named user", "Create a terminator named user",
    "Create User terminator", "Create a terminator with name as user"
]


def define_action(doc):
    verbs = [token for token in doc if token.pos_ == "VERB"]
    has_create = [token for token in verbs if token.lemma_ == "create"]
    if has_create:
        print([it.lemma_ for it in has_create[0].lefts])
        return {has_create[0].nsubj_.lemma_: {}}


for p in phrases:
    # Process whole documents
    text = (p)
    doc = nlp(text)

    # Analyze syntax
    print("Phrase: ", p)
    print("Noun phrases:", [chunk.text for chunk in doc.noun_chunks])
    print("Verbs:", [token.lemma_ for token in doc if token.pos_ == "VERB"])
    print( define_action(doc))

    # Find named entities, phrases and concepts
    for entity in doc.ents:
        print(entity.text, entity.label_)