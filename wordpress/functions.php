<?php
/**
 * Richport Southern Theme Functions & Definitions
 *
 * @package Richport_Southern
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * 1. Theme Setup
 */
function richport_southern_setup() {
    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    // Let WordPress manage the document title.
    add_theme_support( 'title-tag' );

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support( 'post-thumbnails' );
    add_image_size( 'richport-property-card', 800, 500, true );
    add_image_size( 'richport-property-hero', 1600, 900, true );

    // Register Primary Navigation Menu
    register_nav_menus( array(
        'primary' => __( 'Primary Navigation', 'richport-southern' ),
        'footer'  => __( 'Footer Navigation', 'richport-southern' ),
    ) );

    // Switch default core markup to output valid HTML5.
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );

    // Gutenberg Block Styles
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'responsive-embeds' );
}
add_action( 'after_setup_theme', 'richport_southern_setup' );

/**
 * 2. Enqueue Styles and Google Fonts
 */
function richport_southern_scripts() {
    // Google Fonts: Prata, Cinzel, Plus Jakarta Sans
    wp_enqueue_style( 
        'richport-google-fonts', 
        'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Prata&display=swap', 
        array(), 
        null 
    );

    // Main Theme Stylesheet
    wp_enqueue_style( 'richport-style', get_stylesheet_uri(), array(), '1.0.0' );

    // Tailwind CSS distribution (or standalone compiled CSS)
    if ( file_exists( get_template_directory() . '/assets/css/main.css' ) ) {
        wp_enqueue_style( 'richport-main', get_template_directory_uri() . '/assets/css/main.css', array(), '1.0.0' );
    }
}
add_action( 'wp_enqueue_scripts', 'richport_southern_scripts' );

/**
 * 3. Register 'property' Custom Post Type (CPT)
 */
function richport_register_property_cpt() {
    $labels = array(
        'name'                  => _x( 'Properties', 'Post Type General Name', 'richport-southern' ),
        'singular_name'         => _x( 'Property', 'Post Type Singular Name', 'richport-southern' ),
        'menu_name'             => __( 'Arkansas Properties', 'richport-southern' ),
        'name_admin_bar'        => __( 'Property', 'richport-southern' ),
        'archives'              => __( 'Property Archives', 'richport-southern' ),
        'attributes'            => __( 'Property Attributes', 'richport-southern' ),
        'all_items'             => __( 'All Properties', 'richport-southern' ),
        'add_new_item'          => __( 'Add New Property', 'richport-southern' ),
        'add_new'               => __( 'Add New', 'richport-southern' ),
        'new_item'              => __( 'New Property', 'richport-southern' ),
        'edit_item'             => __( 'Edit Property', 'richport-southern' ),
        'update_item'           => __( 'Update Property', 'richport-southern' ),
        'view_item'             => __( 'View Property', 'richport-southern' ),
        'search_items'          => __( 'Search Arkansas Properties', 'richport-southern' ),
        'not_found'             => __( 'No properties found', 'richport-southern' ),
        'not_found_in_trash'    => __( 'No properties found in Trash', 'richport-southern' ),
    );

    $args = array(
        'label'                 => __( 'Property', 'richport-southern' ),
        'description'           => __( 'Arkansas Tax-Sale Homes and Land Parcels', 'richport-southern' ),
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions' ),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-admin-multisite',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => 'inventory',
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true, // Essential for REST API / Headless React!
        'rest_base'             => 'properties',
        'rewrite'               => array( 'slug' => 'properties', 'with_front' => false ),
    );

    register_post_type( 'property', $args );
}
add_action( 'init', 'richport_register_property_cpt', 0 );

/**
 * 4. Register Custom Taxonomies (County & Property Type)
 */
function richport_register_property_taxonomies() {
    // 1. Arkansas County Taxonomy
    $county_labels = array(
        'name'              => _x( 'Arkansas Counties', 'taxonomy general name', 'richport-southern' ),
        'singular_name'     => _x( 'County', 'taxonomy singular name', 'richport-southern' ),
        'search_items'      => __( 'Search Counties', 'richport-southern' ),
        'all_items'         => __( 'All Counties', 'richport-southern' ),
        'edit_item'         => __( 'Edit County', 'richport-southern' ),
        'update_item'       => __( 'Update County', 'richport-southern' ),
        'add_new_item'      => __( 'Add New County', 'richport-southern' ),
        'new_item_name'     => __( 'New County Name', 'richport-southern' ),
        'menu_name'         => __( 'Counties', 'richport-southern' ),
    );

    register_taxonomy( 'property_county', array( 'property' ), array(
        'hierarchical'      => true,
        'labels'            => $county_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'county' ),
        'show_in_rest'      => true,
    ) );

    // 2. Property Type Taxonomy
    $type_labels = array(
        'name'              => _x( 'Property Types', 'taxonomy general name', 'richport-southern' ),
        'singular_name'     => _x( 'Property Type', 'taxonomy singular name', 'richport-southern' ),
        'search_items'      => __( 'Search Property Types', 'richport-southern' ),
        'all_items'         => __( 'All Property Types', 'richport-southern' ),
        'edit_item'         => __( 'Edit Property Type', 'richport-southern' ),
        'update_item'       => __( 'Update Property Type', 'richport-southern' ),
        'add_new_item'      => __( 'Add New Property Type', 'richport-southern' ),
        'new_item_name'     => __( 'New Property Type Name', 'richport-southern' ),
        'menu_name'         => __( 'Property Types', 'richport-southern' ),
    );

    register_taxonomy( 'property_type', array( 'property' ), array(
        'hierarchical'      => true,
        'labels'            => $type_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'property-type' ),
        'show_in_rest'      => true,
    ) );
}
add_action( 'init', 'richport_register_property_taxonomies', 0 );

/**
 * 5. Expose ACF / Post Meta in WordPress REST API for React Headless Mode
 */
function richport_register_rest_property_fields() {
    $meta_keys = array(
        'reference_number',
        'street_address',
        'city',
        'zip',
        'parcel_number',
        'cash_price',
        'owner_finance_available',
        'financed_price',
        'down_payment',
        'interest_rate',
        'term_months',
        'monthly_payment',
        'acreage',
        'bedrooms',
        'bathrooms',
        'sqft',
        'year_built',
        'occupancy',
        'zoning',
        'flood_zone',
        'repair_level',
        'title_status',
        'conveyance_deed',
        'featured_listing',
        'latitude',
        'longitude',
    );

    foreach ( $meta_keys as $key ) {
        register_post_meta( 'property', $key, array(
            'show_in_rest' => true,
            'single'       => true,
            'type'         => ( in_array( $key, array( 'cash_price', 'financed_price', 'down_payment', 'monthly_payment', 'acreage', 'bedrooms', 'bathrooms', 'sqft', 'year_built', 'term_months', 'interest_rate', 'latitude', 'longitude' ) ) ) ? 'number' : 'string',
        ) );
    }
}
add_action( 'init', 'richport_register_rest_property_fields' );
