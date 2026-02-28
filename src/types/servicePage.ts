export interface ServicePageData {
  phoneNumber: string;
  phoneLink: string;

  seo: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogUrl: string;
    twitterTitle: string;
    twitterDescription: string;
    canonical: string;
  };

  schema: {
    service: {
      name: string;
      areaServed: string[];
      description: string;
      serviceType: string;
    };
    faq: Array<{ q: string; a: string }>;
    breadcrumb: {
      name: string;
      item: string;
    };
  };

  hero: {
    h1: string;
    subtitle: string;
  };

  form: {
    fromLabel: string;
    toLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
  };

  exceptional: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Array<{ heading: string; text: string }>;
    grid: {
      darkTile1: string;
      darkTile2: string;
      photo1: { src: string; alt: string };
      photo2: { src: string; alt: string };
    };
  };

  projects: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: Array<{
      image: { src: string; alt: string };
      heading: string;
      text: string;
    }>;
  };

  steps: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: Array<{
      icon: { src: string; alt: string };
      heading: string;
      text: string;
    }>;
  };

  guarantees: {
    eyebrow: string;
    title: string;
    lead: string;
    image: { src: string; alt: string };
    items: string[];
  };

  faq: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: Array<{
      icon: { src: string; alt: string };
      heading: string;
      text: string;
    }>;
  };

  finalCta: {
    heading: string;
    text: string;
  };
}
