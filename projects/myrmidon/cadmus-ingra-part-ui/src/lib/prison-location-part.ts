import { Part } from '@myrmidon/cadmus-core';

/**
 * The PrisonLocation part model.
 */
export interface PrisonLocationPart extends Part {
  prisonId: string;
  cell: string;
  location: string;
}

/**
 * The type ID used to identify the PrisonLocationPart type.
 */
export const PRISON_LOCATION_PART_TYPEID = 'it.vedph.ingra.prison-location';

/**
 * JSON schema for the PrisonLocation part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const PRISON_LOCATION_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/ingra/' + PRISON_LOCATION_PART_TYPEID + '.json',
  type: 'object',
  title: 'PrisonLocationPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'prisonId',
    'cell',
    'location',
  ],
  properties: {
    timeCreated: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    creatorId: {
      type: 'string',
    },
    timeModified: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    userId: {
      type: 'string',
    },
    id: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    itemId: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    typeId: {
      type: 'string',
      pattern: '^[a-z][-0-9a-z._]*$',
    },
    roleId: {
      type: ['string', 'null'],
      pattern: '^([a-z][-0-9a-z._]*)?$',
    },
    prisonId: {
      type: 'string',
    },
    cell: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
  },
};
