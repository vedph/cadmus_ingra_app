import { HistoricalDateModel, Part } from '@myrmidon/cadmus-core';

/**
 * An ID with a rank, used in GraffitiInfoPart.
 */
export interface RankedId {
  id: string;
  rank?: number;
}

/**
 * The GraffitiInfo part model.
 */
export interface GraffitiInfoPart extends Part {
  graffitiId: string;
  language: string;
  verse?: string;
  rhyme?: string;
  author?: string;
  identifications?: RankedId[];
  date?: HistoricalDateModel;
}

/**
 * The type ID used to identify the GraffitiInfoPart type.
 */
export const GRAFFITI_INFO_PART_TYPEID = 'it.vedph.ingra.graffiti-info';

/**
 * JSON schema for the GraffitiInfo part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const GRAFFITI_INFO_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.vedph.it/cadmus/parts/ingra/' + GRAFFITI_INFO_PART_TYPEID + '.json',
  type: 'object',
  title: 'GraffitiInfoPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'graffitiId',
    'language',
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
    graffitiId: {
      type: 'string',
    },
    language: {
      type: 'string',
    },
    verse: {
      type: 'string',
    },
    rhyme: {
      type: 'string',
    },
    author: {
      type: 'string',
    },
    identifications: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['id'],
            properties: {
              id: {
                type: 'string',
              },
              rank: {
                type: 'integer',
              },
            },
          },
        ],
      },
    },
    date: {
      type: 'object',
      required: ['a'],
      properties: {
        a: {
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              type: 'integer',
            },
            isCentury: {
              type: 'boolean',
            },
            isSpan: {
              type: 'boolean',
            },
            isApproximate: {
              type: 'boolean',
            },
            isDubious: {
              type: 'boolean',
            },
            day: {
              type: 'integer',
            },
            month: {
              type: 'integer',
            },
            hint: {
              type: ['string', 'null'],
            },
          },
        },
        b: {
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              type: 'integer',
            },
            isCentury: {
              type: 'boolean',
            },
            isSpan: {
              type: 'boolean',
            },
            isApproximate: {
              type: 'boolean',
            },
            isDubious: {
              type: 'boolean',
            },
            day: {
              type: 'integer',
            },
            month: {
              type: 'integer',
            },
            hint: {
              type: ['string', 'null'],
            },
          },
        },
      },
    },
  },
};
