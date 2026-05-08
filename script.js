// Inisialisasi Ikon
lucide.createIcons();

// --- KONFIGURASI ---
// const WHATSAPP_NUMBER = "6285655703937";

// const products = [
    { id: 1, name: "Spider Web Knit", price: 285000, img: "https://cdn.phototourl.com/free/2026-05-07-946c810c-95c7-439c-a6b4-a207d8d9a9fd.jpg" },
    { id: 2, name: "Dreamy Oversize Tee", price: 195000, img: "https://cdn.phototourl.com/free/2026-05-07-a857f427-5f75-498b-b3e8-0cc0f4e64601.jpg" },
    { id: 3, name: "Vintage Kalcer Jacket", price: 450000, img: "https://cdn.phototourl.com/free/2026-05-07-5a927ede-0022-4e4e-a022-60a6ac4c202d.jpg" },
    { id: 4, name: "Shadow Cargo Pants", price: 320000, img: "https://cdn.phototourl.com/free/2026-05-07-89f3b257-2796-4cc7-a0f1-5b3ef5d243c6.jpg" },
    { id: 5, name: "Noir Spider Hoodie", price: 385000, img: "https://cdn.phototourl.com/free/2026-05-07-78dd156c-3f6f-446f-808e-c7327c1fba1f.jpg" },
    { id: 6, name: "Ethereal Workshirt", price: 275000, img: "https://cdn.phototourl.com/free/2026-05-07-4fa91ac2-bffd-4a2c-9982-776a8e066a8e.jpg" },
    { id: 7, name: "Midnight Denim", price: 350000, img: "https://cdn.phototourl.com/free/2026-05-07-04ed6576-1142-4c34-9843-4769aa02632e.jpg" }
];

let cart = [];

// --- LOGIC LOGIN ---
function handleLogin() {
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');
    
    if (pass === "123") {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('dashboard-page').classList.remove('hidden');
        renderProducts();
    } else {
        errorMsg.classList.remove('hidden');
    }
}

function handleLogout() {
    location.reload(); // Simple reset ke halaman login
}

// --- LOGIC PRODUK ---
function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => `
        <div class="glass p-3 rounded-[2.5rem] group hover:border-red-600/50 transition-all duration-500 relative overflow-hidden">
            <div class="h-64 overflow-hidden rounded-[2rem] bg-zinc-900">
                <img src="${p.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-100">
            </div>
            <div class="p-4">
                <h3 class="font-bold text-sm tracking-tight mb-1">${p.name}</h3>
                <p class="text-red-500 font-black text-lg mb-4">Rp ${p.price.toLocaleString('id-ID')}</p>
                <button onclick="addToCart(${p.id})" class="w-full bg-white/5 border border-white/10 text-white py-3 rounded-2xl text-xs font-bold hover:bg-white hover:text-black transition-all flex justify-center items-center gap-2">
                    <i data-lucide="plus" class="w-4 h-4"></i> Add to Bag
                </button>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// --- LOGIC KERANJANG ---
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    
    const cartBtn = document.getElementById('cartButton');
    cartBtn.classList.remove('hidden');
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    cartCount.innerText = cart.length;
    
    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="flex items-center justify-between bg-white/5 p-4 rounded-3xl">
                <div class="flex items-center gap-4">
                    <img src="${item.img}" class="w-12 h-12 rounded-xl object-cover">
                    <div>
                        <p class="text-xs font-bold">${item.name}</p>
                        <p class="text-[10px] text-zinc-500 italic">Rp ${item.price.toLocaleString('id-ID')}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="text-zinc-600 hover:text-red-500 transition"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
        `;
    }).join('');
    
    totalPrice.innerText = `Rp ${total.toLocaleString('id-ID')}`;
    lucide.createIcons();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    if (cart.length === 0) document.getElementById('cartButton').classList.add('hidden');
}

function toggleCartModal() {
    document.getElementById('cartModal').classList.toggle('hidden');
}

// --- LOGIC WHATSAPP ---
function checkoutWhatsApp() {
    if (cart.length === 0) return;

    let total = 0;
    let listItems = "";
    cart.forEach((p, i) => {
        listItems += `${i + 1}. ${p.name} - Rp ${p.price.toLocaleString('id-ID')}\n`;
        total += p.price;
    });

    const message = `*DREAMY THRIFT ORDER*\n\n` +
        `Halo Admin, saya ingin order:\n` +
        `----------------------------\n` +
        `${listItems}` +
        `----------------------------\n` +
        `*Total: Rp ${total.toLocaleString('id-ID')}*\n\n` +
        `*Data Diri:*\n` +
        `Nama: \n` +
        `Alamat: \n` +
        `----------------------------\n` +
        `Mohon diproses ya bro! 🕸️`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
