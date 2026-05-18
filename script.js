const resources = [
  {
    id: 'logeion',
    title: 'Logeion',
    description: 'Υψηλής ποιότητας λεξικό και πρόσβαση σε λεξικά αρχαίων ελληνικών.',
    url: 'https://logeion.uchicago.edu/',
    category: 'Λεξικά',
    tags: ['λεξικό', 'ancient greek', 'λεξικο']
  },
  {
    id: 'perseus',
    title: 'Perseus Digital Library',
    description: 'Μεγάλη συλλογή αρχαίων κειμένων και μεταφράσεων με αναλυτικά σχόλια.',
    url: 'http://www.perseus.tufts.edu/',
    category: 'Κείμενα',
    tags: ['κείμενα', 'classics', 'πηγές', 'ανάλυση']
  },
  {
    id: 'alpheios',
    title: 'Alpheios',
    description: 'Εργαλεία γλωσσικής ανάλυσης και γραμματική για αρχαία ελληνικά.',
    url: 'https://alpheios.net/',
    category: 'Γραμματική',
    tags: ['γραμματική', 'σύνταξη', 'ανάλυση']
  },
  {
    id: 'polytonic-converter',
    title: 'Greek Polytonic Converter',
    description: 'Μετατροπέας μονής όψης σε πολυτονικό ελληνικό κείμενο με άμεση προεπισκόπηση.',
    url: 'https://www.lexilogos.com/keyboard/greek_polytonic.htm',
    category: 'Πολυτονιστές',
    tags: ['πολυτονικό', 'γράμμα', 'συμβολοσειρά']
  },
  {
    id: 'dickinson',
    title: 'Dickinson College Commentaries',
    description: 'Οδηγός σε αντιγραφικά και αρχαία ελληνικά κείμενα με λεξικά και συντάξεις.',
    url: 'https://dcc.dickinson.edu/',
    category: 'Κείμενα',
    tags: ['χειρόγραφα', 'κειμενα', 'λεξικό']
  }
];

let activeCategory = null;

function normalizeText(value) {
  return String(value).toLowerCase();
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('visible'));
  setTimeout(() => t.classList.remove('visible'), 2400);
  setTimeout(() => t.remove(), 2800);
}

function renderResources(data) {
  const container = document.getElementById('results-container');
  container.innerHTML = '';

  if (!data.length) {
    container.innerHTML = '<div class="no-results card"><p>Δεν βρέθηκαν αποτελέσματα με τα τρέχοντα φίλτρα.</p></div>';
    return;
  }

  data.forEach(resource => {
    const card = document.createElement('article');
    card.className = 'resource-card';

    const title = document.createElement('h3');
    title.textContent = resource.title;

    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = resource.category;

    const description = document.createElement('p');
    description.textContent = resource.description;

    const tags = document.createElement('div');
    tags.className = 'tags';
    resource.tags.slice(0, 4).forEach(tagValue => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = tagValue;
      tags.appendChild(tag);
    });

    const button = document.createElement('a');
    button.className = 'btn primary';
    button.href = resource.url;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.textContent = 'Επίσκεψη';

    card.appendChild(badge);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(tags);
    card.appendChild(button);
    container.appendChild(card);
  });
}

function filterResources() {
  const searchValue = normalizeText(document.getElementById('search-input').value.trim());

  const filtered = resources.filter(resource => {
    const haystack = [resource.title, resource.description, resource.category, ...resource.tags]
      .map(normalizeText)
      .join(' ');

    const matchesQuery = !searchValue || haystack.includes(searchValue);
    const matchesCategory = !activeCategory || resource.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  renderResources(filtered);
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const categoryCards = document.querySelectorAll('.category-card');

  renderResources(resources);

  input.addEventListener('input', filterResources);

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!input.value.trim() && !activeCategory) {
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 600);
      showToast('Γράψτε κάτι ή επιλέξτε κατηγορία για να δείτε αποτελέσματα.');
      return;
    }
    filterResources();
  });

  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const selectedCategory = this.dataset.category;
      activeCategory = activeCategory === selectedCategory ? null : selectedCategory;

      categoryCards.forEach(item => {
        item.classList.toggle('active', item.dataset.category === activeCategory);
      });

      filterResources();
    });
  });
});
