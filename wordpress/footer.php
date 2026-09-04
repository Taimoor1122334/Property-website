<?php
/**
 * Footer template for Richport Southern Theme
 *
 * @package Richport_Southern
 */
?>
    </main><!-- #primary -->

    <!-- Site Footer -->
    <footer id="colophon" class="site-footer bg-[#0F241A] text-stone-300 border-t-4 border-[#C29F59] mt-16 pt-16 pb-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#244533]">
                <!-- Column 1: Brand & Identity -->
                <div class="lg:col-span-4 space-y-4">
                    <div class="font-serif font-bold text-2xl text-white tracking-wide">
                        RICHPORT SOUTHERN
                    </div>
                    <p class="text-xs text-stone-400 leading-relaxed font-sans max-w-sm">
                        Arkansas tax-sale real estate investment, title clearing, and community stewardship enterprise headquartered in Little Rock. Offering straightforward cash purchases and accessible owner-financing terms.
                    </p>
                    <div class="pt-2 text-xs text-[#DFC386] font-semibold">
                        Direct Deedholders (No Brokers or Intermediaries)
                    </div>
                </div>

                <!-- Column 2: Quick Links Navigation -->
                <div class="lg:col-span-2 space-y-3">
                    <h4 class="font-serif text-sm font-bold text-white uppercase tracking-wider">Properties</h4>
                    <ul class="space-y-2 text-xs text-stone-400">
                        <li><a href="<?php echo esc_url( home_url( '/inventory' ) ); ?>" class="hover:text-white transition-colors">All Inventory</a></li>
                        <li><a href="<?php echo esc_url( home_url( '/how-it-works' ) ); ?>" class="hover:text-white transition-colors">How Financing Works</a></li>
                        <li><a href="<?php echo esc_url( home_url( '/what-to-know' ) ); ?>" class="hover:text-white transition-colors">Buyer Due Diligence</a></li>
                        <li><a href="<?php echo esc_url( home_url( '/former-owners' ) ); ?>" class="hover:text-white transition-colors">Former Property Owners</a></li>
                    </ul>
                </div>

                <!-- Column 3: Corporate & Legal -->
                <div class="lg:col-span-3 space-y-3">
                    <h4 class="font-serif text-sm font-bold text-white uppercase tracking-wider">Disclosures</h4>
                    <ul class="space-y-2 text-xs text-stone-400">
                        <li><a href="<?php echo esc_url( home_url( '/legal' ) ); ?>" class="hover:text-white transition-colors">As-Is Purchase Policy</a></li>
                        <li><a href="<?php echo esc_url( home_url( '/legal' ) ); ?>" class="hover:text-white transition-colors">Statutory Tax Title Notice</a></li>
                        <li><a href="<?php echo esc_url( home_url( '/legal' ) ); ?>" class="hover:text-white transition-colors">Equal Housing Opportunity</a></li>
                        <li><a href="<?php echo esc_url( home_url( '/legal' ) ); ?>" class="hover:text-white transition-colors">Privacy &amp; Data Security</a></li>
                    </ul>
                </div>

                <!-- Column 4: Contact & Office -->
                <div class="lg:col-span-3 space-y-3">
                    <h4 class="font-serif text-sm font-bold text-white uppercase tracking-wider">Office &amp; Servicing</h4>
                    <p class="text-xs text-stone-400">
                        Richport Southern, LLC<br>
                        Little Rock, Arkansas<br>
                        Telephone: (501) 500-2440<br>
                        Inquiries: acquisitions@richportsouthern.com
                    </p>
                </div>
            </div>

            <!-- Bottom Legal Bar -->
            <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
                <div>
                    &copy; <?php echo esc_html( date( 'Y' ) ); ?> Richport Southern, LLC. All rights reserved.
                </div>
                <div>
                    Arkansas Tax-Sale Real Estate &amp; Land Stewardship.
                </div>
            </div>
        </div>
    </footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
