import type { V2_MetaDescriptor } from '@remix-run/node';
import type { Location } from '@remix-run/react';
import { SettingsResponse } from '@tryghost/content-api';

export function generateMeta({
  metadata,
  data,
  location,
}: {
  metadata: V2_MetaDescriptor[];
  data: any;
  location: Location;
}): V2_MetaDescriptor[] {
  let baseMetaData: V2_MetaDescriptor[] = [
    {
      title: 'Lodybo',
    },
    {
      name: 'description',
      content:
        'My personal blog about front-end development. I write about React, TypeScript, Tailwind CSS, and more.',
    },
    {
      name: 'og:type',
      content: 'website',
    },
  ];

  // merge metadata with baseMetaData if defined
  if (metadata) {
    const baseMetaCopy = [...baseMetaData];
     baseMetaData = baseMetaCopy.map((meta) => {
      const metaIndex = metadata.findIndex((m) => m.name === meta.name);
      if (metaIndex > -1) {
        return metadata[metaIndex];
      }
      return meta;
     }
  }

  if (data && data.ghostSettings) {
    const { ghostSettings } = data as { ghostSettings: SettingsResponse };

    if (ghostSettings.meta_title) {
      baseMetaData.push({
        name: 'og:site_name',
        content: ghostSettings.meta_title,
      });
    }
    if (ghostSettings.meta_title) {
      baseMetaData.push({
        name: 'og:title',
        content: ghostSettings.meta_title,
      });
    }
    if (ghostSettings.meta_description) {
      baseMetaData.push({
        name: 'og:description',
        content: ghostSettings.meta_description,
      });
    }
    if (ghostSettings.url) {
      baseMetaData.push({
        name: 'og:url',
        content: `${ghostSettings.url}${location.pathname.substring(1)}`,
      });
    }
    if (ghostSettings.cover_image) {
      baseMetaData.push({
        name: 'og:image',
        content: ghostSettings.cover_image,
      });
    }
    if (ghostSettings.facebook) {
      baseMetaData.push({
        name: 'article:publisher',
        content: ghostSettings.facebook,
      });
    }
    if (ghostSettings.twitter_title) {
      console.log('twitter title', ghostSettings.twitter_title);
      baseMetaData.push(
        {
          name: 'twitter:site',
          content: ghostSettings.twitter_title,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: ghostSettings.meta_title,
        },
        {
          name: 'twitter:description',
          content: ghostSettings.meta_description,
        },
        {
          name: 'twitter:url',
          content: `${ghostSettings.url}${location.pathname.substring(1)}`,
        },
        {
          name: 'twitter:image',
          content: ghostSettings.cover_image,
        },
      );
    }
  }

  return baseMetaData;
}
