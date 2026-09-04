<?php
/**
 * Template for displaying property post type archives
 *
 * @package Richport_Southern
 */

get_header(); ?>

<div class="archive-property-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Header Banner -->
    <div class="bg-[#FAF8F5] rounded-xl border border-[#E0D7C2] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
        <div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#967433]">
                Arkansas Property Portfolio
            </span>
            <h1 class="font-serif text-2xl sm:text-3xl font-bold text-[#153023] mt-1">
                Available Tax-Sale Properties &amp; Land
            </h1>
            <p class="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Browse verified Arkansas properties acquired directly through state and county tax sales. Filter by terms, county, or property type.
            </p>
        </div>
    </div>

    <!-- Properties Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <?php
        if ( have_posts() ) :
            while ( have_posts() ) : the_post();
                get_template_part( 'template-parts/property-card' );
            endwhile;

            // Numeric Pagination
            the_posts_pagination( array(
                'mid_size'  => 2,
                'prev_text' => __( '&larr; Previous', 'richport-southern' ),
                'next_text' => __( 'Next &rarr;', 'richport-southern' ),
                'class'     => 'col-span-full py-6 flex justify-center gap-2',
            ) );
        else :
            echo '<div class="col-span-3 text-center py-12 bg-white rounded-lg border border-[#DECFA9] p-8 text-stone-600 text-sm">No Arkansas properties found matching the selected criteria.</div>';
        endif;
        ?>
    </div>
</div>

<?php get_footer(); ?>
