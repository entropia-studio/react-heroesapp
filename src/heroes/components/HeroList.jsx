import React from 'react';
import { getHeroesByPublisher } from '../helpers/getHeroesByPublisher';

export const HeroList = ({ publisher }) => {
  const heroesList = getHeroesByPublisher(publisher);

  return (
    <ul>
      {heroesList.map((hero) => (
        <li key={hero.id}>{hero.superhero}</li>
      ))}
    </ul>
  );
};
