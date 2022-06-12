import 'styles/footer.css';

function Footer() {
  const today = new Date();

  return (
    <footer>
      <p>Alexander Rusiecki &copy; {today.getFullYear()}</p>
    </footer>
  );
}

export default Footer;
