import css from './Homepage.css';
import solicon from './solicon.png';

function Homepage(props) {
  return (
    <section>
      <div class='hero'>
        <h1>Become a Web3 Programmer Today!</h1>
        <p>
          Are you fed-up of being stuck in tutorial hell? Do you feel like
          you're learning, yet stall when it comes to writing code without a
          template? If any of these apply to you, gramps mystery toolbox is the
          place for you. Here we've collated a box of mystery tools useful for
          blockchaini developers, ti help you build, and ingrain your knowledge
          permanently in a useful and effective manner.
        </p>
        <button class='header-cta'>
          <a href='/Product'>Products</a>
        </button>
      </div>

      <div>
        <img position='absolute' alt='test' width='500' src={solicon}></img>
      </div>
    </section>
  );
}

export default Homepage;
