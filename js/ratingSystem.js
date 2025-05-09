$(document).ready(function() {
    // Initialize rating system
    function initRatingSystem() {
        const gameId = new URLSearchParams(window.location.search).get('game');
        if (!gameId) return;

        // Get user's previous rating
        const userRating = userRatings.getGameRatings(gameId);
        
        if (userRating) {
            // Highlight stars up to user's rating
            $('.star').each(function() {
                if ($(this).data('rating') <= userRating) {
                    $(this).addClass('active');
                }
            });
            $('.rating-message').text(`You rated this game ${userRating} stars`);
        }

        // Update average rating display
        updateAverageRatingDisplay(userRatings.calculateAverageRating(gameId));

        // Handle star hover
        $('.star').hover(
            function() {
                const rating = $(this).data('rating');
                $('.star').removeClass('active');
                $('.star').each(function() {
                    if ($(this).data('rating') <= rating) {
                        $(this).addClass('active');
                    }
                });
            },
            function() {
                const userRating = userRatings.getGameRatings(gameId);
                $('.star').removeClass('active');
                if (userRating) {
                    $('.star').each(function() {
                        if ($(this).data('rating') <= userRating) {
                            $(this).addClass('active');
                        }
                    });
                }
            }
        );

        // Handle star click
        $('.star').click(function() {
            const rating = $(this).data('rating');
            const gameId = new URLSearchParams(window.location.search).get('game');
            const currentRating = userRatings.getGameRatings(gameId);
            
            // If clicking the same star as current rating, remove the rating
            if (currentRating === rating) {
                if (userRatings.removeRating(gameId)) {
                    // Update game rating in allGames array
                    const game = allGames.find(g => g.id === gameId);
                    if (game) {
                        const ratingInfo = userRatings.calculateAverageRating(gameId);
                        game.rating = ratingInfo.average;
                    }

                    // Update display
                    updateAverageRatingDisplay(userRatings.calculateAverageRating(gameId));
                    $('.rating-message').text('');
                    $('.star').removeClass('active');
                }
            } else {
                // Save the new rating
                if (userRatings.saveRating(gameId, rating)) {
                    // Update game rating in allGames array
                    const game = allGames.find(g => g.id === gameId);
                    if (game) {
                        const ratingInfo = userRatings.calculateAverageRating(gameId);
                        game.rating = ratingInfo.average;
                    }

                    // Update display
                    updateAverageRatingDisplay(userRatings.calculateAverageRating(gameId));
                    $('.rating-message').text(`You rated this game ${rating} stars`);
                }
            }
        });
    }

    function updateAverageRatingDisplay(ratingInfo) {
        const averageRating = parseFloat(ratingInfo.average);
        const roundedRating = Math.round(averageRating);
        const totalRatings = ratingInfo.count;
        
        let displayText = '';
        if (totalRatings === 0) {
            displayText = `
                <div class="no-ratings">
                    <span class="rating-icon">⭐</span>
                    <span class="rating-text">No ratings yet</span>
                    <span class="rating-subtext">Be the first to rate this game!</span>
                </div>`;
        } else {
            displayText = `
                <div class="rating-display">
                    <div class="stars">${'⭐'.repeat(roundedRating)}</div>
                    <div class="rating-details">
                        <span class="rating-value">${averageRating}/5</span>
                        <span class="rating-count">${totalRatings} ${totalRatings === 1 ? 'rating' : 'ratings'}</span>
                    </div>
                </div>`;
        }
        
        $('.average-rating').html(displayText);
    }

    // Initialize when DOM is ready
    initRatingSystem();
}); 