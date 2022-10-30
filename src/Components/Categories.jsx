import React from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categorie, index) => (
          <li
            key={categorie}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {categorie}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
