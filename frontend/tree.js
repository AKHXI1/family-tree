document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in by checking for a token
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first');
        window.location.href = 'index.html'; // Redirect to the homepage if not logged in
        return;
    }

    // Fetch family tree data from the backend API
    try {
        const response = await fetch('/api/family', {
            headers: {
                'Authorization': `Bearer ${token}`, // Send token for authorization
            }
        });

        if (response.ok) {
            const familyData = await response.json(); // Parse the returned JSON data
            // Render the fetched family data to the page
            renderFamilyTree(familyData);
        } else {
            alert('Failed to fetch family tree data');
        }
    } catch (error) {
        console.error('Error:', error); // Log any errors in fetching family data
    }
});

// Function to render the family tree on the page
function renderFamilyTree(familyMembers) {
    const treeContainer = document.getElementById('tree-container');
    treeContainer.innerHTML = ''; // Clear any existing family tree display

    familyMembers.forEach(member => {
        // Create a new div element for each family member
        const memberDiv = document.createElement('div');
        memberDiv.className = 'family-member';
        memberDiv.innerText = member.name; // Display the family member's name

        // Optionally, display the member's relation (e.g., Mother, Father)
        const relationText = document.createElement('p');
        relationText.innerText = `Relation: ${member.relation}`;
        memberDiv.appendChild(relationText);

        // Optionally, display the member's parent (if any)
        if (member.parentId) {
            const parentText = document.createElement('p');
            parentText.innerText = `Parent: ${member.parentId}`;
            memberDiv.appendChild(parentText);
        }

        // Append the family member div to the tree container
        treeContainer.appendChild(memberDiv);
    });
}

// Event listener to add a new family member when the "Add Family Member" button is clicked
document.getElementById('add-member').addEventListener('click', async function () {
    // Prompt the user for family member details
    const name = prompt('Enter the name of the family member:');
    if (!name) return; // If no name is provided, exit

    const relation = prompt('Enter the relation (e.g., Mother, Father, etc.):');
    if (!relation) return; // If no relation is provided, exit

    const parentId = prompt('Enter the Parent ID (if applicable):');
    
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first');
        window.location.href = 'index.html'; // Redirect to login if not logged in
        return;
    }

    // Send the new family member data to the server
    try {
        const response = await fetch('/api/family/add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Send token for authorization
                'Content-Type': 'application/json', // Indicate JSON request body
            },
            body: JSON.stringify({ name, relation, parentId }), // Convert data to JSON
        });

        const data = await response.json();
        if (response.ok) {
            alert('Family member added successfully');
            // Reload the family tree after adding the member
            window.location.reload();
        } else {
            alert('Error adding family member');
        }
    } catch (error) {
        console.error('Error:', error); // Log any errors in adding the family member
    }
});
