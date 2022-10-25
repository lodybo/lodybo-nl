import Icon from '~/components/Icon';

const Footer = () => (
  <footer className="border-t py-5 px-10 flex flex-row justify-between">
    <p>© 2022</p>

    <ul className="flex flex-row gap-5">
      <li>
        <a
          className="flex flex-row gap-1.5 items-center"
          href="https://www.twitter.com/lodybo"
          target="_blank"
          rel="noopener"
        >
          <Icon prefix="fab" name="twitter" />
          <small>@lodybo</small>
        </a>
      </li>

      <li>
        <a
          className="flex flex-row gap-1.5 items-center"
          href="https://www.github.com/lodybo"
          target="_blank"
          rel="noopener"
        >
          <Icon prefix="fab" name="github" />
          <small>@lodybo</small>
        </a>
      </li>
    </ul>
  </footer>
);

export default Footer;
