import React from 'react';

type ArticleModalProps = {
  isOpen: boolean;
  article: any;
  onClose: () => void;
};

const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, article, onClose }) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">{article.title}</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">
            ×
          </button>
        </div>
        <img
          className="w-full h-48 object-cover mt-4 rounded-lg"
          src={article.urlToImage || 'https://via.placeholder.com/400x200'}
          alt={article.title}
        />
        <p className="text-gray-700 mt-4">{article.description}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 mt-4 block"
        >
          Read full article
        </a>
      </div>
    </div>
  );
};

export default ArticleModal;
