document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.business-card');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    let currentIndex = 0;
    let isAnimating = false;

    // Function to show a specific card with direction
    function showCard(index, direction = 'right') {
        if (isAnimating) return;
        isAnimating = true;

        const currentCard = cards[currentIndex];
        const nextCard = cards[index];

        // Remove all animation classes
        cards.forEach(card => {
            card.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
        });

        // Set initial positions without transitions
        if (direction === 'right') {
            currentCard.classList.add('slide-out-left');
            nextCard.classList.add('slide-in-right');
        } else {
            currentCard.classList.add('slide-out-right');
            nextCard.classList.add('slide-in-left');
        }

        // Force a reflow to ensure initial positions are set
        nextCard.offsetHeight;

        // Start the animation by adding active class
        requestAnimationFrame(() => {
            nextCard.classList.add('active');
        });

        // Update current index
        currentIndex = index;

        // Reset animation state after transition
        setTimeout(() => {
            cards.forEach(card => {
                if (card !== nextCard) {
                    card.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
                }
            });
            isAnimating = false;
        }, 800);
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = cards.length - 1;
        }
        showCard(newIndex, 'left');
    });

    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= cards.length) {
            newIndex = 0;
        }
        showCard(newIndex, 'right');
    });

    // Initialize the first card
    cards[0].classList.add('active');

    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('modal-close')[0];

    // Ensure modal is hidden on page load
    modal.style.display = 'none';

    // Function to open modal with image
    window.openModal = function(element) {
        const img = element.querySelector('img');
        modal.style.display = 'flex';
        modalImg.src = img.src;
        
        // Add active class after a small delay to trigger animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    };

    // Close modal when clicking the close button
    closeBtn.onclick = function() {
        modal.classList.remove('active');
        
        // Hide modal after animation completes
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Close modal when clicking outside the image
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            
            // Hide modal after animation completes
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    // Portfolio navigation
    let currentPortfolioIndex = 0;
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let isPortfolioAnimating = false;

    // Make the navigatePortfolio function globally available
    window.navigatePortfolio = function(direction) {
        if (isPortfolioAnimating) return;
        isPortfolioAnimating = true;
        
        const totalItems = portfolioItems.length;
        const currentItem = portfolioItems[currentPortfolioIndex];
        
        // Remove active class from current item
        currentItem.classList.remove('active');
        
        // Calculate the new index
        if (direction === 'next') {
            currentPortfolioIndex = (currentPortfolioIndex + 1) % totalItems;
        } else {
            currentPortfolioIndex = (currentPortfolioIndex - 1 + totalItems) % totalItems;
        }
        
        const nextItem = portfolioItems[currentPortfolioIndex];
        
        // Remove all animation classes
        portfolioItems.forEach(item => {
            item.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
        });
        
        // Set up the animation based on direction
        if (direction === 'next') {
            // For right navigation (next)
            currentItem.classList.add('slide-out-left');
            nextItem.classList.add('slide-in-right');
        } else {
            // For left navigation (prev)
            currentItem.classList.add('slide-out-right');
            nextItem.classList.add('slide-in-left');
        }
        
        // Force a reflow to ensure the initial positions are set
        nextItem.offsetHeight;
        
        // Add active class to new item
        nextItem.classList.add('active');
        
        // Reset animation state after transition
        setTimeout(() => {
            // Remove all animation classes from all items
            portfolioItems.forEach((item, index) => {
                if (index !== currentPortfolioIndex) {
                    item.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
                }
            });
            isPortfolioAnimating = false;
        }, 500);
    };

    // Add click event listeners to portfolio images
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            openModal(this);
        });
    });
}); 