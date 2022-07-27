import { getHeroesByPublisher } from '../helpers/getHeroesByPublisher';
import { HeroCard } from './HeroCard';
HeroCard;
export const HeroList = ({ publisher }) => {
  const heroesList = getHeroesByPublisher(publisher);

  return (
    <div className='row row-cols-1 row-cols-md-3 g-3'>
      {heroesList.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};
