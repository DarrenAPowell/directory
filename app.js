document.addEventListener('DOMContentLoaded', () => {
  const userList = document.getElementById('userList');
  const searchBar = document.getElementById('searchBar');
  const cityFilter = document.getElementById('cityFilter');
  let users = [];
  let filteredUsers = [];

  // Fetch users from the API
  fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
          users = data;
          filteredUsers = data;
          displayUsers(data);
          populateCityFilter(data);
      })
      .catch(error => console.error('Error fetching users:', error));

  // Display users in the DOM
  function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
          const userCard = document.createElement('div');
          userCard.className = 'user-card';
          userCard.innerHTML = `
              <h2>${user.name}</h2>
              <p><i class="fas fa-envelope"></i>Email: ${user.email}</p>
              <p><i class="fas fa-map-marker-alt"></i>Address: ${user.address.street}, ${user.address.city}</p>
          `;
          userList.appendChild(userCard);
      });
  }

  // Populate city filter dropdown
  function populateCityFilter(users) {
      const cities = [...new Set(users.map(user => user.address.city))];
      cities.forEach(city => {
          const option = document.createElement('option');
          option.value = city;
          option.textContent = city;
          cityFilter.appendChild(option);
      });
  }

  // Filter users based on search input and city filter
  function filterUsers() {
      const searchText = searchBar.value.toLowerCase();
      const selectedCity = cityFilter.value;
      filteredUsers = users.filter(user => {
          const matchesName = user.name.toLowerCase().includes(searchText);
          const matchesCity = selectedCity ? user.address.city === selectedCity : true;
          return matchesName && matchesCity;
      });
      displayUsers(filteredUsers);
  }

  // Event listeners for filtering
  searchBar.addEventListener('input', filterUsers);
  cityFilter.addEventListener('change', filterUsers);
});
