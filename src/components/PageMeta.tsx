import React from 'react';

const DEFAULT_TITLE = 'HerRise Development Organisation';
const DEFAULT_DESCRIPTION = 'HerRise Development Organisation is a national NGO in Uganda dedicated to the empowerment and wellbeing of women and girls.';

interface PageMetaProps {
  title?: string;
  description?: string;
  fullTitle?: string;
}

export const PageMeta: React.FC<PageMetaProps> = ({ title, description, fullTitle }) => {
  const resolvedTitle = fullTitle ?? (title ? `${title} | HerRise` : DEFAULT_TITLE);
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION;

  React.useEffect(() => {
    document.title = resolvedTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', resolvedDescription);
    return () => {
      document.title = DEFAULT_TITLE;
      if (metaDesc) metaDesc.setAttribute('content', DEFAULT_DESCRIPTION);
    };
  }, [resolvedTitle, resolvedDescription]);

  return null;
};
