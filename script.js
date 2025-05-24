// Menu data with real food images
const menuItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, basil, and olive oil",
        price: 14.99,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5b6f67692?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 2,
        name: "Pepperoni Supreme",
        description: "Classic pepperoni with extra cheese and Italian herbs",
        price: 17.99,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 3,
        name: "Veggie Deluxe",
        description: "Bell peppers, mushrooms, onions, olives, and tomatoes",
        price: 16.99,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 4,
        name: "Hawaiian Paradise",
        description: "Ham, pineapple, and mozzarella cheese",
        price: 15.99,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 5,
        name: "Meat Lovers",
        description: "Pepperoni, sausage, ham, and bacon",
        price: 19.99,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 6,
        name: "Garlic Bread",
        description: "Crispy bread with garlic butter and herbs",
        price: 6.99,
        category: "appetizer",
        image: "https://images.unsplash.com/photo-1619985632461-f33748ef8a3c?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 7,
        name: "Mozzarella Sticks",
        description: "Golden fried mozzarella with marinara sauce",
        price: 8.99,
        category: "appetizer",
        image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 8,
        name: "Caesar Salad",
        description: "Crisp romaine, parmesan, croutons, and caesar dressing",
        price: 9.99,
        category: "appetizer",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 9,
        name: "Buffalo Wings",
        description: "Spicy buffalo wings with blue cheese dip",
        price: 11.99,
        category: "appetizer",
        image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 10,
        name: "Classic Coke",
        description: "Ice-cold Coca-Cola",
        price: 2.99,
        category: "drink",
        image: "https://images.unsplash.com/photo-1629203851122-3726ecdf5615?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 11,
        name: "Fresh Lemonade",
        description: "Freshly squeezed lemonade with mint",
        price: 3.99,
        category: "drink",
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 12,
        name: "Iced Tea",
        description: "Refreshing iced tea with lemon",
        price: 2.49,
        category: "drink",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&crop=center"
    }
];

// Cart functionality
let cart = [];

function renderMenu(items = menuItems) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = items.map((item, index) => `
        <div class="menu-item" style="animation-delay: ${index * 0.1}s">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="menu-item-footer">
                <span class="price">$${item.price.toFixed(2)}</span>
                <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function filterMenu(category) {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
    renderMenu(filteredItems);
}

function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
    
    // Add visual feedback
    event.target.style.background = '#4caf50';
    event.target.textContent = 'Added!';
    setTimeout(() => {
        event.target.style.background = '#4caf50';
        event.target.textContent = 'Add to Cart';
    }, 1000);
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCount.textContent = totalItems;
    cartCount.classList.toggle('show', totalItems > 0);

    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = 'Total: $0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                <small>$${item.price.toFixed(2)} each</small>
            </div>
            <div class="quantity-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.id !== itemId);
        }
        updateCartUI();
    }
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('show');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order! Total: $${total.toFixed(2)}\n\nYour delicious food will be ready in 25-30 minutes!`);
    
    cart = [];
    updateCartUI();
    toggleCart();
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const headerHeight = 80;
    const targetPosition = section.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        toggleCart();
    }
}

// Initialize the menu
document.addEventListener('DOMContentLoaded', function() {
    renderMenu();
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(211, 47, 47, 0.95), rgba(244, 67, 54, 0.95))';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #d32f2f, #f44336)';
        header.style.backdropFilter = 'none';
    }
});