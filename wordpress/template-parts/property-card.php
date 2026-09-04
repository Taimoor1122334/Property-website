<?php
/**
 * Template part for displaying a property card in loops
 *
 * @package Richport_Southern
 */

$post_id          = get_the_ID();
$ref_number       = get_post_meta( $post_id, 'reference_number', true );
$street_address   = get_post_meta( $post_id, 'street_address', true );
$city             = get_post_meta( $post_id, 'city', true );
$cash_price       = get_post_meta( $post_id, 'cash_price', true );
$monthly_pmt      = get_post_meta( $post_id, 'monthly_payment', true );
$down_payment     = get_post_meta( $post_id, 'down_payment', true );
$owner_finance    = get_post_meta( $post_id, 'owner_finance_available', true );
$acreage          = get_post_meta( $post_id, 'acreage', true );
$repair_level     = get_post_meta( $post_id, 'repair_level', true );

$counties         = get_the_terms( $post_id, 'property_county' );
$county_name      = ( ! empty( $counties ) && ! is_wp_error( $counties ) ) ? $counties[0]->name : 'Arkansas';

$types            = get_the_terms( $post_id, 'property_type' );
$type_name        = ( ! empty( $types ) && ! is_wp_error( $types ) ) ? $types[0]->name : 'Real Estate';
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'property-card group bg-white rounded-lg border border-[#E5DEC9] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col' ); ?>>
    <!-- Property Image & Status Badges -->
    <div class="relative aspect-16/10 overflow-hidden bg-stone-200">
        <?php if ( has_post_thumbnail() ) : ?>
            <?php the_post_thumbnail( 'richport-property-card', array( 'class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' ) ); ?>
        <?php else : ?>
            <div class="w-full h-full bg-[#153023]/10 flex items-center justify-center text-stone-400 text-xs">
                Arkansas Property Photo
            </div>
        <?php endif; ?>

        <!-- Badges -->
        <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-[#1B3B2B] text-[#FAF7F2] shadow-sm">
                Available
            </span>
        </div>

        <div class="absolute bottom-3 left-3">
            <span class="inline-block px-2.5 py-0.5 rounded-sm text-xs font-medium bg-[#153023]/85 backdrop-blur-xs text-stone-100 border border-white/10">
                <?php echo esc_html( $type_name ); ?>
            </span>
        </div>

        <?php if ( $ref_number ) : ?>
            <div class="absolute bottom-3 right-3 text-[10px] font-mono font-medium px-2 py-0.5 rounded-sm bg-black/60 text-stone-300">
                <?php echo esc_html( $ref_number ); ?>
            </div>
        <?php endif; ?>
    </div>

    <!-- Card Body -->
    <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
            <div class="text-xs text-[#967433] font-bold uppercase tracking-wider mb-1">
                <?php echo esc_html( $county_name ); ?> County, AR
            </div>
            <h3 class="font-serif font-bold text-lg text-[#153023] group-hover:text-[#967433] transition-colors line-clamp-1">
                <a href="<?php the_permalink(); ?>">
                    <?php the_title(); ?>
                </a>
            </h3>
            <p class="text-xs text-stone-500 mt-0.5 line-clamp-1">
                <?php echo esc_html( $street_address . ', ' . $city . ', AR' ); ?>
            </p>
        </div>

        <!-- Property Attributes -->
        <div class="grid grid-cols-2 gap-2 py-2 border-y border-[#EDE6D6] text-xs text-stone-600">
            <div>
                <span class="font-bold text-[#153023]"><?php echo esc_html( $acreage ); ?> Acres</span>
            </div>
            <div class="text-right truncate">
                <span class="text-stone-500"><?php echo esc_html( $repair_level ? $repair_level : 'As-Is' ); ?></span>
            </div>
        </div>

        <!-- Pricing & Action Row -->
        <div class="flex items-end justify-between gap-2 pt-1">
            <div>
                <span class="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">Cash Price</span>
                <span class="text-xl font-bold font-serif text-[#153023]">
                    $<?php echo esc_html( number_format( (float)$cash_price ) ); ?>
                </span>
            </div>

            <?php if ( $owner_finance && $monthly_pmt ) : ?>
                <div class="text-right">
                    <span class="text-[10px] text-[#25523D] uppercase tracking-wider font-semibold block">Owner Finance</span>
                    <span class="text-sm font-bold text-[#153023]">
                        $<?php echo esc_html( number_format( (float)$monthly_pmt ) ); ?>/mo
                    </span>
                </div>
            <?php endif; ?>
        </div>

        <a href="<?php the_permalink(); ?>" class="w-full py-2 px-3 rounded bg-[#FAF8F5] hover:bg-[#153023] text-[#153023] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors border border-[#DECFA9] inline-flex items-center justify-center gap-1.5 mt-2">
            <span>Inspect Property Details</span>
            &rarr;
        </a>
    </div>
</article>
