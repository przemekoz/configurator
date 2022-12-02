<?php

enum Endpoints: string
{
    case Client = "clients";
    case Element = "elements";
    case Dictionary = "dictionaries";
    case DictionaryValue = "dictionary_values";
    case ElementDictionaryValue = "element_dictionary_values";
}
