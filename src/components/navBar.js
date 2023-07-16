class Navbar {
  constructor(navItems) {
    this.navItems = navItems;
    this.nav = document.createElement('nav');
    this.ul = document.createElement('ul');
  }

  createNavbar() {
    this.navItems.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = item;
      li.appendChild(a);
      this.ul.appendChild(li);
    });

    this.nav.appendChild(this.ul);
    document.body.appendChild(this.nav);
  }
}

export default Navbar;
