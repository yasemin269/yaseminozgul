// myscript.js - E-Ticaret Sepet Mantığı

let cart = JSON.parse(localStorage.getItem('benimSepetim')) || [];

function addToCart(name, price, image) {
    const item = {
        name: name,
        price: parseFloat(price),
        image: image
    };
    
    cart.push(item);
    localStorage.setItem('benimSepetim', JSON.stringify(cart));
    alert(name + " sepete eklendi!");
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('benimSepetim', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }

    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Sepetiniz şu an boş.</p>';
            cartTotalElement.innerText = '0 TL';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemHTML = `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <img src="../img/${item.image}" alt="${item.name}">
                        <div class="cart-item-title">${item.name}</div>
                    </div>
                    <div class="cart-item-price">${item.price} TL</div>
                    <button class="btn-remove" data-index="${index}">Sil</button>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
            total += item.price;
        });

        cartTotalElement.innerText = total + " TL";
    }
}

function validateForm(event) {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
        alert("Lütfen adınızı ve e-posta adresinizi giriniz.");
        return false;
    }
    
    alert("Mesajınız başarıyla gönderildi! Teşekkürler " + nameInput.value);
    document.getElementById('contact-form').reset();
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('btn-remove')) {
                const index = e.target.getAttribute('data-index');
                removeFromCart(index);
            }
        });
    }

    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            const image = this.getAttribute('data-image');
            addToCart(name, price, image);
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Ödeme sistemine yönlendiriliyorsunuz... (Ödevin kapsamı dışındadır)');
        });
    }

    // --- MİNİ QUİZ UYGULAMASI ---
    const quizBtns = document.querySelectorAll('.quiz-btn');
    const quizResult = document.getElementById('quiz-result');

    quizBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Sadece bir kere cevap verme hakkı için butonları devre dışı bırakalım
            quizBtns.forEach(b => b.disabled = true);
            
            const answer = this.getAttribute('data-answer');
            if(answer === 'B') {
                quizResult.innerHTML = 'Tebrikler! Doğru cevap. 🎉 İndirim Kodunuz: <strong>YASEMIN15</strong>';
                quizResult.className = 'quiz-result quiz-success';
                this.classList.add('btn-success');
            } else {
                quizResult.innerHTML = 'Maalesef yanlış cevap. Doğru cevap "localStorage" olmalıydı.';
                quizResult.className = 'quiz-result quiz-error';
                this.classList.add('btn-error');
            }
        });
    });
});
