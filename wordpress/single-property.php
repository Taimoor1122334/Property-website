<?php
/**
 * Template for displaying a single property listing
 *
 * @package Richport_Southern
 */

get_header();

while ( have_posts() ) : the_post();
    $post_id          = get_the_ID();
    $ref_number       = get_post_meta( $post_id, 'reference_number', true );
    $street_address   = get_post_meta( $post_id, 'street_address', true );
    $city             = get_post_meta( $post_id, 'city', true );
    $zip              = get_post_meta( $post_id, 'zip', true );
    $parcel_number    = get_post_meta( $post_id, 'parcel_number', true );
    $cash_price       = get_post_meta( $post_id, 'cash_price', true );
    $monthly_pmt      = get_post_meta( $post_id, 'monthly_payment', true );
    $down_payment     = get_post_meta( $post_id, 'down_payment', true );
    $owner_finance    = get_post_meta( $post_id, 'owner_finance_available', true );
    $acreage          = get_post_meta( $post_id, 'acreage', true );
    $repair_level     = get_post_meta( $post_id, 'repair_level', true );
    $occupancy        = get_post_meta( $post_id, 'occupancy', true );
    $zoning           = get_post_meta( $post_id, 'zoning', true );
    $flood_zone       = get_post_meta( $post_id, 'flood_zone', true );
    $title_status     = get_post_meta( $post_id, 'title_status', true );

    $counties         = get_the_terms( $post_id, 'property_county' );
    $county_name      = ( ! empty( $counties ) && ! is_wp_error( $counties ) ) ? $counties[0]->name : 'Arkansas';
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'single-property-entry max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10' ); ?>>
    <!-- Breadcrumb -->
    <div class="pb-4 border-b border-[#E0D7C2] text-xs">
        <a href="<?php echo esc_url( get_post_type_archive_link( 'property' ) ); ?>" class="text-stone-600 hover:text-[#153023] font-medium">
            &larr; Back to All Arkansas Properties
        </a>
    </div>

    <!-- Title & Pricing Banner -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-8 space-y-3">
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#967433]">
                <span><?php echo esc_html( $county_name ); ?> County, AR</span>
                <span>•</span>
                <span>Parcel APN: <?php echo esc_html( $parcel_number ); ?></span>
            </div>
            <h1 class="font-serif text-3xl sm:text-4xl font-bold text-[#153023]">
                <?php the_title(); ?>
            </h1>
            <p class="text-stone-600 text-sm">
                <?php echo esc_html( $street_address . ', ' . $city . ', AR ' . $zip ); ?>
            </p>
        </div>

        <div class="lg:col-span-4 bg-white p-6 rounded-xl border border-[#DECFA9] shadow-xs space-y-4">
            <div class="flex justify-between items-baseline border-b border-stone-100 pb-3">
                <span class="text-xs font-semibold text-stone-500 uppercase tracking-wider">Cash Price</span>
                <span class="font-serif text-3xl font-bold text-[#153023]">
                    $<?php echo esc_html( number_format( (float)$cash_price ) ); ?>
                </span>
            </div>

            <?php if ( $owner_finance && $monthly_pmt ) : ?>
                <div class="bg-[#FAF8F5] p-3 rounded-lg border border-[#DECFA9] space-y-1">
                    <span class="text-xs font-bold text-[#153023] uppercase tracking-wider block">Owner Financing</span>
                    <div class="flex justify-between text-xs">
                        <span class="text-stone-600">Down Payment:</span>
                        <span class="font-bold text-[#153023]">$<?php echo esc_html( number_format( (float)$down_payment ) ); ?></span>
                    </div>
                    <div class="flex justify-between text-xs">
                        <span class="text-stone-600">Monthly P&amp;I:</span>
                        <span class="font-bold text-[#153023]">$<?php echo esc_html( number_format( (float)$monthly_pmt ) ); ?>/mo</span>
                    </div>
                </div>
            <?php endif; ?>

            <a href="<?php echo esc_url( home_url( '/apply?property=' . get_the_ID() ) ); ?>" class="block w-full text-center py-3 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs">
                Apply for Owner Financing
            </a>
        </div>
    </div>

    <!-- Main Photo & Gallery -->
    <div class="aspect-16/9 rounded-xl overflow-hidden shadow-sm bg-stone-200">
        <?php if ( has_post_thumbnail() ) : ?>
            <?php the_post_thumbnail( 'richport-property-hero', array( 'class' => 'w-full h-full object-cover' ) ); ?>
        <?php endif; ?>
    </div>

    <!-- Specifications Grid -->
    <div class="bg-white p-6 sm:p-8 rounded-xl border border-[#DECFA9] space-y-6">
        <h2 class="font-serif text-xl font-bold text-[#153023] border-b border-[#E0D7C2] pb-3">
            Property Specifications &amp; Due Diligence
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
                <span class="text-stone-500 font-medium block">Land Area</span>
                <span class="font-bold text-[#153023] text-sm"><?php echo esc_html( $acreage ); ?> Acres</span>
            </div>
            <div>
                <span class="text-stone-500 font-medium block">Zoning</span>
                <span class="font-bold text-[#153023] text-sm"><?php echo esc_html( $zoning ? $zoning : 'County Unzoned' ); ?></span>
            </div>
            <div>
                <span class="text-stone-500 font-medium block">Occupancy</span>
                <span class="font-bold text-[#153023] text-sm"><?php echo esc_html( $occupancy ); ?></span>
            </div>
            <div>
                <span class="text-stone-500 font-medium block">Flood Zone</span>
                <span class="font-bold text-[#153023] text-sm"><?php echo esc_html( $flood_zone ? $flood_zone : 'Zone X' ); ?></span>
            </div>
        </div>

        <div class="pt-4 border-t border-[#EDE6D6] text-xs text-stone-700 leading-relaxed entry-content">
            <?php the_content(); ?>
        </div>
    </div>
</article>

<?php
endwhile;

get_footer();
