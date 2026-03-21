const strings = {
  en: {
    searchPlaceholder: 'Search for articles...',
    forAdministrators: 'For Administrators',
    forLearners: 'For Learners',
    allCollections: 'All Collections',
    article: 'article',
    articles: 'articles',
    didThisAnswer: 'Did this answer your question?',
    noResults: 'No results found',
    articlesSoon: 'Articles coming soon. Check back later.',
    searchResults: 'Results for',
    writtenBy: 'Written by',
    updatedOn: 'Updated on',
    tableOfContents: 'Table of contents',
    backToTop: 'Back to top',
    yes: 'Yes',
    no: 'No',
    found: 'found',
    tryDifferent: 'Try different keywords or',
    browseAll: 'browse all collections',
  },
  ru: {
    searchPlaceholder: 'Поиск статей...',
    forAdministrators: 'Для администраторов',
    forLearners: 'Для учащихся',
    allCollections: 'Все разделы',
    article: 'статья',
    articles: 'статей',
    didThisAnswer: 'Это было полезно?',
    noResults: 'Ничего не найдено',
    articlesSoon: 'Статьи скоро появятся.',
    searchResults: 'Результаты поиска',
    writtenBy: 'Автор:',
    updatedOn: 'Обновлено:',
    tableOfContents: 'Содержание',
    backToTop: 'Наверх',
    yes: 'Да',
    no: 'Нет',
    found: 'найдено',
    tryDifferent: 'Попробуйте другие ключевые слова или',
    browseAll: 'посмотрите все разделы',
  },
}

export type Locale = 'en' | 'ru'
export type Strings = { [K in keyof typeof strings.en]: string }

export function getStrings(locale: Locale): Strings {
  return strings[locale] ?? strings.en
}
