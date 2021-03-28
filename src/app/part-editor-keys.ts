import {
  CATEGORIES_PART_TYPEID,
  DOC_REFERENCES_PART_TYPEID,
  NOTE_PART_TYPEID,
  TOKEN_TEXT_PART_TYPEID,
  COMMENT_PART_TYPEID,
  COMMENT_FRAGMENT_TYPEID,
  BIBLIOGRAPHY_PART_TYPEID,
} from '@myrmidon/cadmus-part-general-ui';
import { APPARATUS_FRAGMENT_TYPEID } from '@myrmidon/cadmus-part-philology-ui';
import { PartEditorKeys } from '@myrmidon/cadmus-core';
import { PRISON_INFO_PART_TYPEID } from '@myrmidon/cadmus-ingra-part-ui';

const GENERAL = 'general';
const PHILOLOGY = 'philology';
const INGRA = 'ingra';
const TOKEN_TEXT_LAYER_PART_TYPEID = 'it.vedph.token-text-layer';

/**
 * The parts and fragments editor keys for this UI.
 * Each property is a part type ID, mapped to a value of type PartGroupKey,
 * having a part property with the part's editor key, and a fragments property
 * with the mappings between fragment type IDs and their editor keys.
 */
export const PART_EDITOR_KEYS: PartEditorKeys = {
  [BIBLIOGRAPHY_PART_TYPEID]: {
    part: GENERAL,
  },
  [CATEGORIES_PART_TYPEID]: {
    part: GENERAL,
  },
  [COMMENT_PART_TYPEID]: {
    part: GENERAL,
  },
  [DOC_REFERENCES_PART_TYPEID]: {
    part: GENERAL,
  },
  [NOTE_PART_TYPEID]: {
    part: GENERAL,
  },
  [TOKEN_TEXT_PART_TYPEID]: {
    part: GENERAL,
  },
  // ingra parts
  [PRISON_INFO_PART_TYPEID]: {
    part: INGRA,
  },
  // layer parts
  [TOKEN_TEXT_LAYER_PART_TYPEID]: {
    part: GENERAL,
    fragments: {
      [APPARATUS_FRAGMENT_TYPEID]: PHILOLOGY,
      [COMMENT_FRAGMENT_TYPEID]: GENERAL,
    },
  },
};
