<?php
/**
 * Header template for Richport Southern Theme
 *
 * @package Richport_Southern
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class( 'bg-[#FAF8F5] text-stone-900 font-sans selection:bg-[#DECFA9] selection:text-[#153023]' ); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site wp-site-blocks min-h-screen flex flex-col">
    <a class="skip-link screen-reader-text sr-only focus:not-sr-only focus:p-4 focus:bg-white focus:text-[#153023] focus:z-50" href="#primary">
        <?php esc_html_e( 'Skip to content', 'richport-southern' ); ?>
    </a>

    <!-- Top Notice Bar -->
    <div class="bg-[#153023] text-[#E7D6B5] px-4 py-1.5 text-xs">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
            <div class="flex items-center gap-2 font-medium tracking-wide">
                <span class="inline-block w-2 h-2 rounded-full bg-[#C29F59] animate-pulse"></span>
                <span>Direct Arkansas Tax Sale Land &amp; Homes • Cash Sales &amp; Owner Financing</span>
            </div>
            <div class="flex items-center gap-4 text-[11px] text-stone-300">
                <span class="hidden md:inline">Little Rock, Arkansas</span>
                <span class="hidden md:inline">•</span>
                <a href="tel:5015002440" class="font-semibold text-[#F4EDE0] hover:text-[#C29F59] transition-colors flex items-center gap-1">
                    (501) 500-2440
                </a>
            </div>
        </div>
    </div>

    <!-- Main Sticky Header -->
    <header id="masthead" class="site-header sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFC9] shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <!-- Site Branding / Logo -->
                <div class="site-branding">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="inline-flex items-center gap-3">
                        <div class="font-serif font-bold text-xl sm:text-2xl text-[#153023] tracking-wide">
                            <?php bloginfo( 'name' ); ?>
                        </div>
                    </a>
                </div>

                <!-- Primary Desktop Navigation -->
                <nav id="site-navigation" class="main-navigation hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-stone-700">
                    <?php
                    wp_nav_menu( array(
                        'theme_location' => 'primary',
                        'menu_id'        => 'primary-menu',
                        'container'      => false,
                        'menu_class'     => 'flex items-center gap-6',
                        'fallback_cb'    => false,
                    ) );
                    ?>
                    <a href="<?php echo esc_url( home_url( '/inventory' ) ); ?>" class="px-4 py-2 rounded-md bg-[#153023] hover:bg-[#1E4331] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs">
                        Browse Land &amp; Homes
                    </a>
                </nav>
            </div>
        </div>
    </header>

    <main id="primary" class="site-main flex-1">
