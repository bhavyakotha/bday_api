document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form');
    const fetchBtn = document.getElementById('fetch-btn');
    const updateForm = document.getElementById('update-form');
    const deleteBtn = document.getElementById('delete-btn');
  
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const birthdate = document.getElementById('birthdate').value;
      try {
        const response = await fetch('/api/birthdays/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, birthdate }),
        });
        const data = await response.json();
        alert('Birthday added successfully');
      } catch (error) {
        alert('Error adding birthday');
      }
    });
  
    fetchBtn.addEventListener('click', async () => {
      const name = document.getElementById('fetch-name').value;
      try {
        const response = await fetch(`/api/birthdays/${name}`);
        const data = await response.json();
        document.getElementById('birthday-info').innerText = `Birthdate: ${new Date(data.birthdate).toDateString()}`;
      } catch (error) {
        document.getElementById('birthday-info').innerText = 'Error fetching birthday';
      }
    });
  
    updateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('update-name').value;
      const birthdate = document.getElementById('new-birthdate').value;
      try {
        const response = await fetch(`/api/birthdays/${name}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ birthdate }),
        });
        const data = await response.json();
        alert('Birthday updated successfully');
      } catch (error) {
        alert('Error updating birthday');
      }
    });
  
    deleteBtn.addEventListener('click', async () => {
      const name = document.getElementById('delete-name').value;
      try {
        const response = await fetch(`/api/birthdays/${name}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        alert('Birthday deleted successfully');
      } catch (error) {
        alert('Error deleting birthday');
      }
    });
  });
  