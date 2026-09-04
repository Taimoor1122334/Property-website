<?php
/**
 * Template for displaying the front page
 *
 * @package Richport_Southern
 */

get_header(); ?>

<div class="front-page-content entry-content space-y-16 pb-16">
    <!-- Hero Section -->
    <section class="wp-block-group relative bg-[#153023] text-white border-b-4 border-[#C29F59] z-20">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-7 space-y-6">
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#204432] border border-[#C29F59]/40 text-[#DFC386] text-xs font-semibold tracking-wider uppercase">
                        <span>Direct Arkansas Tax Sale Land &amp; Properties</span>
                    </div>

                    <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                        A Clear Path Forward for Arkansas Homes &amp; Land
                    </h1>

                    <p class="text-base sm:text-lg text-stone-200 leading-relaxed font-sans max-w-2xl">
                        We market Arkansas tax-sale real estate for straightforward cash sale or accessible owner financing. Straight facts, transparent as-is disclosures, and no sales pressure.
                    </p>

                    <div class="pt-2 flex flex-wrap items-center gap-4">
                        <a href="<?php echo esc_url( home_url( '/inventory' ) ); ?>" class="px-6 py-3.5 rounded-md bg-[#DFC386] hover:bg-[#D5B570] text-[#153023] font-bold text-sm tracking-wide transition-all shadow-md inline-flex items-center gap-2">
                            Browse Available Properties
                        </a>
                        <a href="<?php echo esc_url( home_url( '/how-it-works' ) ); ?>" class="px-6 py-3.5 rounded-md bg-[#224734] hover:bg-[#2C5942] text-white font-semibold text-sm border border-[#C29F59]/50 transition-all inline-flex items-center gap-2">
                            How Owner Financing Works
                        </a>
                    </div>
                </div>

                <!-- Right Brand Pillar -->
                <div class="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-[#112419]/80 rounded-2xl border-2 border-[#C29F59]/50 shadow-2xl text-center space-y-4">
                    <h3 class="font-serif text-2xl font-bold text-white tracking-wider">
                        RICHPORT SOUTHERN
                    </h3>
                    <p class="text-xs uppercase tracking-widest text-[#DFC386] font-semibold">
                        Arkansas Homes &amp; Land • Est. 2024
                    </p>
                    <p class="text-xs text-stone-300 max-w-xs leading-relaxed font-sans pt-1">
                        Committed to responsible land stewardship, clear title conveyance, and creating homeownership opportunities across the Natural State.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Properties Loop -->
    <section class="wp-block-group relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
                <span class="text-xs font-bold uppercase tracking-widest text-[#967433]">Current Arkansas Portfolio</span>
                <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#153023] mt-1">
                    Featured Properties &amp; Land
                </h2>
                <p class="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                    Inspect current representative tax-sale parcels available for direct purchase or owner financing.
                </p>
            </div>
            <a href="<?php echo esc_url( home_url( '/inventory' ) ); ?>" class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#153023] hover:text-[#967433]">
                View All Available Inventory &rarr;
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php
            $featured_query = new WP_Query( array(
                'post_type'      => 'property',
                'posts_per_page' => 6,
            ) );

            if ( $featured_query->have_posts() ) :
                while ( $featured_query->have_posts() ) : $featured_query->the_post();
                    get_template_part( 'template-parts/property-card' );
                endwhile;
                wp_reset_postdata();
            else :
                echo '<p class="text-xs text-stone-500 col-span-3">No properties published yet. Add properties in WP Admin > Arkansas Properties.</p>';
            endif;
            ?>
        </div>
    </section>
</div>

<?php get_footer(); ?>
