/*
 * RSVP script for Zac & Elena's wedding
 *
 * This script powers the RSVP form on the remade site. It exposes a fresh
 * guest list on every page load, without disabling names based on previous
 * submissions. Guests may add multiple names using the “Add another guest”
 * button. When the form is submitted the data is stored in localStorage
 * under the key `rsvps`. Each entry includes the selected guests, attendance
 * choice, whether they are bringing a guest, a song suggestion and a
 * personal message. After submission the form resets and a new blank
 * guest row is added.
 */

// Full guest list. The `ceremony` flag from the original site is retained for
// completeness but not used in this simplified RSVP form. If you need to
// differentiate ceremony‑only guests in the future, you can refer to this
// property on each object.
const guestList = [
  { name: "Aaron Electrician", ceremony: false },
  { name: "Abbie Filmer", ceremony: true },
  { name: "Abish Khatri", ceremony: true },
  { name: "Adam kells", ceremony: true },
  { name: "Adam Moore", ceremony: true },
  { name: "Aisha McPherson", ceremony: true },
  { name: "Aleyah Campbell", ceremony: true },
  { name: "Andy Jashan", ceremony: false },
  { name: "Armani Wright", ceremony: true },
  { name: "Aston England", ceremony: true },
  { name: "Beau Narrabean", ceremony: false },
  { name: "Ben England", ceremony: false },
  { name: "Ben Perth", ceremony: false },
  { name: "Benso", ceremony: false },
  { name: "Bidu", ceremony: true },
  { name: "Blake clearhiam", ceremony: false },
  { name: "Blake moller", ceremony: false },
  { name: "Blake moon", ceremony: false },
  { name: "Brighton Kells", ceremony: true },
  { name: "Brock Wright", ceremony: false },
  { name: "Brooke Hartley", ceremony: true },
  { name: "Calum Hartop", ceremony: true },
  { name: "Carer one", ceremony: true },
  { name: "Carer two", ceremony: true },
  { name: "Cem Or", ceremony: true },
  { name: "Charles Gialanze", ceremony: true },
  { name: "Charlie Gialanze", ceremony: true },
  { name: "Christie Gialanze", ceremony: true },
  { name: "Clifford Blake", ceremony: true },
  { name: "Colin Sieder", ceremony: true },
  { name: "Connor Salmond", ceremony: true },
  { name: "Corey Taylor", ceremony: true },
  { name: "Corey’s Girlfriend", ceremony: true },
  { name: "Dallas Bullock", ceremony: false },
  { name: "Daniel Kells", ceremony: true },
  { name: "David gialanze", ceremony: true },
  { name: "Dennis Gialanze", ceremony: true },
  { name: "Dennis Or", ceremony: true },
  { name: "Divya", ceremony: true },
  { name: "Dom Ayer’s", ceremony: false },
  { name: "Donna Dailey", ceremony: false },
  { name: "Dyl Luka", ceremony: false },
  { name: "Dylan McPherson", ceremony: true },
  { name: "Ebben McPherson", ceremony: true },
  { name: "Elena Gialanze", ceremony: true },
  { name: "Evette Mckecknie", ceremony: true },
  { name: "Felicity blacke smith", ceremony: false },
  { name: "Fransisco Chico", ceremony: false },
  { name: "Gary Kells", ceremony: true },
  { name: "Georgina Miller Molloy", ceremony: true },
  { name: "Hacer Or", ceremony: true },
  { name: "Hallie Kells", ceremony: true },
  { name: "Harley Reece", ceremony: false },
  { name: "Holly Nilsson", ceremony: false },
  { name: "Hope Kells", ceremony: true },
  { name: "Huss Roumi", ceremony: false },
  { name: "Ilona Kells", ceremony: false },
  { name: "Imogen Cobb", ceremony: true },
  { name: "Imogen Cobb boyfriend", ceremony: true },
  { name: "Irene Singh", ceremony: false },
  { name: "Irene’s Singh Hubby", ceremony: false },
  { name: "Jack McCann", ceremony: false },
  { name: "Jacob Dev", ceremony: false },
  { name: "Jacob maladondo", ceremony: false },
  { name: "Jade Kells", ceremony: true },
  { name: "Jai Wright", ceremony: false },
  { name: "Jake Coglan", ceremony: false },
  { name: "Jake Durban", ceremony: true },
  { name: "Jake Gialanze", ceremony: true },
  { name: "Jako Craig", ceremony: false },
  { name: "Jamie Geelan", ceremony: true },
  { name: "Jamie Seider", ceremony: true },
  { name: "Jasmine Kells", ceremony: true },
  { name: "Jaxson Moore", ceremony: true },
  { name: "Jenny Brady", ceremony: true },
  { name: "Jenny gialanze", ceremony: true },
  { name: "Jessie Donna’s girl", ceremony: false },
  { name: "Jessie Sapsed", ceremony: false },
  { name: "Jimmy McPherson", ceremony: false },
  { name: "John mailei", ceremony: false },
  { name: "Jorge Miranda", ceremony: true },
  { name: "Josh Caldwell", ceremony: false },
  { name: "Joshua Petsalis", ceremony: false },
  { name: "Joshua Wright", ceremony: false },
  { name: "Josie Kells", ceremony: true },
  { name: "Katie Frost", ceremony: true },
  { name: "Kelcie Alannah", ceremony: false },
  { name: "Kiara McPherson", ceremony: true },
  { name: "Kim Dental", ceremony: false },
  { name: "Kim’s Hubby", ceremony: false },
  { name: "Laylah Cotteral", ceremony: true },
  { name: "Leilah rose", ceremony: false },
  { name: "Leon Darrel", ceremony: false },
  { name: "Les Hartop", ceremony: true },
  { name: "Lex Hartop", ceremony: true },
  { name: "Liam Ayers", ceremony: false },
  { name: "Lincoln", ceremony: true },
  { name: "Luca Hugo brother", ceremony: false },
  { name: "Lukas Weizner", ceremony: true },
  { name: "Luke Caldwell", ceremony: false },
  { name: "Luke Seider", ceremony: false },
  { name: "Luke Wright", ceremony: true },
  { name: "Lydia Nugent", ceremony: true },
  { name: "Marcus Cottrell", ceremony: true },
  { name: "Maria Pullicino", ceremony: true },
  { name: "Mariah Kells", ceremony: true },
  { name: "Mark Coulduck", ceremony: true },
  { name: "Mary Gialanze", ceremony: true },
  { name: "Mary Hartop", ceremony: true },
  { name: "Max bove", ceremony: false },
  { name: "Max coglan", ceremony: false },
  { name: "Megan Hartop", ceremony: true },
  { name: "Milan P", ceremony: true },
  { name: "Minn England", ceremony: true },
  { name: "Nathan van Burren", ceremony: true },
  { name: "Nick Scuba", ceremony: false },
  { name: "Oakley Wright", ceremony: true },
  { name: "Redmond Hartop", ceremony: true },
  { name: "Renoir (Blakes)", ceremony: false },
  { name: "Richard Godsell", ceremony: true },
  { name: "Riley Nicols", ceremony: false },
  { name: "Riza T", ceremony: true },
  { name: "Rob Nowra", ceremony: true },
  { name: "Ryder Cottrell", ceremony: true },
  { name: "Sam gialanze", ceremony: true },
  { name: "Sammy wigens", ceremony: false },
  { name: "Sarah hagan", ceremony: false },
  { name: "Shaniia Kells", ceremony: true },
  { name: "Sharon Seider", ceremony: true },
  { name: "Shawniece Higgins", ceremony: false },
  { name: "Shell Lees", ceremony: false },
  { name: "Shells kid one", ceremony: false },
  { name: "Shells kid two", ceremony: false },
  { name: "Skye Kells", ceremony: true },
  { name: "Skye Wright", ceremony: false },
  { name: "Sophie Hartop", ceremony: true },
  { name: "Stan H", ceremony: true },
  { name: "Sueann Peterson", ceremony: false },
  { name: "Terry Mckecknie", ceremony: true },
  { name: "Theo Chikomba", ceremony: true },
  { name: "Tye Koori", ceremony: false },
  { name: "Victor French", ceremony: false },
  { name: "Wendy Ludlow", ceremony: false },
  { name: "Wendy Wright", ceremony: false },
  { name: "Will Lydia’s Man", ceremony: true },
  { name: "Wyatt Campbell", ceremony: true },
  { name: "Zac gialanze", ceremony: true },
  { name: "Zac Keith", ceremony: false }
];

/**
 * Create a new guest row and append it to the provided container. Each row
 * consists of a select element populated with the guest list and a remove
 * button. Changing a select triggers `updateSelectOptions` to ensure that
 * once a name is selected in one row it cannot be selected in another row.
 *
 * @param {HTMLElement} container The element to which the row should be appended.
 */
function createGuestRow(container) {
  const row = document.createElement('div');
  row.className = 'guest-row';

  const select = document.createElement('select');
  select.className = 'guest-select';
  select.required = true;

  // Default placeholder option
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Select guest';
  select.appendChild(placeholder);

  // Populate options from guestList
  guestList.forEach((guest) => {
    const opt = document.createElement('option');
    opt.value = guest.name;
    opt.textContent = guest.name;
    select.appendChild(opt);
  });

  // When the selected name changes, refresh all select options
  select.addEventListener('change', updateSelectOptions);
  row.appendChild(select);

  // Button to remove this guest row
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'remove-guest';
  removeBtn.textContent = '×';
  removeBtn.addEventListener('click', () => {
    container.removeChild(row);
    updateSelectOptions();
  });
  row.appendChild(removeBtn);

  container.appendChild(row);
}

/**
 * Disable options in all guest selects based on selections currently made.
 * Only selections in the current form are respected; previously submitted
 * RSVPs stored in localStorage do not disable names, so the guest list is
 * always fresh. Selected options remain enabled in their own select.
 */
function updateSelectOptions() {
  const selects = document.querySelectorAll('.guest-select');
  // Collect names currently selected in each select (ignoring empty values)
  const selectedNames = Array.from(selects)
    .map((sel) => sel.value)
    .filter((val) => val !== '');
  selects.forEach((select) => {
    const options = select.querySelectorAll('option');
    options.forEach((opt) => {
      if (opt.value === '') {
        // Always enable the placeholder option
        opt.disabled = false;
        return;
      }
      // Disable option if another select has already chosen that name
      if (selectedNames.includes(opt.value) && opt.value !== select.value) {
        opt.disabled = true;
        opt.style.color = '#ccc';
      } else {
        opt.disabled = false;
        opt.style.color = '';
      }
    });
  });
}

/**
 * Handle click on “Add another guest” button. Adds a fresh guest row to
 * the guest list container and updates options to reflect current selections.
 */
function handleAddGuest() {
  const container = document.getElementById('guestListContainer');
  createGuestRow(container);
  updateSelectOptions();
}

/**
 * Handle RSVP form submission. Collects the form values, appends a new
 * entry to the `rsvps` array in localStorage and resets the form for
 * another submission. A success message is displayed to the user.
 *
 * @param {Event} event
 */
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;

  // Build an entry from form values
  const guests = Array.from(form.querySelectorAll('.guest-select'))
    .map((select) => select.value)
    .filter((val) => val !== '');
  if (guests.length === 0) {
    alert('Please select at least one guest.');
    return;
  }
  const attendance = form.elements['attendance'].value;
  const bringGuest = form.elements['bringGuest'].value;
  const song = form.elements['song'].value.trim();
  const message = form.elements['message'].value.trim();

  const entry = {
    guests,
    attendance,
    bringGuest,
    song,
    message,
    lateShuttle: document.getElementById('lateShuttle').checked,
    shuttleAddress: document.getElementById('shuttleAddress').value.trim(),
    timestamp: new Date().toISOString(),
  };

  // Persist to localStorage
  const rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
  rsvps.push(entry);
  localStorage.setItem('rsvps', JSON.stringify(rsvps));

  // Show thank you message
  const msgEl = document.getElementById('rsvpMessage');
  msgEl.textContent = 'Thank you for your RSVP! We can’t wait to celebrate with you.';
  msgEl.style.color = 'green';

  // Reset the form
  form.reset();
  const container = document.getElementById('guestListContainer');
  container.innerHTML = '';
  createGuestRow(container);
  updateSelectOptions();
}

// Initialise the form when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('guestListContainer');
  // Always start with one guest row
  createGuestRow(container);
  updateSelectOptions();
  document.getElementById('addGuestBtn').addEventListener('click', handleAddGuest);
  document.getElementById('rsvpForm').addEventListener('submit', handleSubmit);

  // Show/hide drop‑off address based on late‑night shuttle checkbox
  const lateShuttleCheckbox = document.getElementById('lateShuttle');
  const shuttleAddressGroup = document.getElementById('shuttleAddressGroup');
  if (lateShuttleCheckbox) {
    lateShuttleCheckbox.addEventListener('change', () => {
      if (lateShuttleCheckbox.checked) {
        shuttleAddressGroup.style.display = 'block';
      } else {
        shuttleAddressGroup.style.display = 'none';
      }
    });
  }
});