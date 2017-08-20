import $ from "jquery";
import Scrollmap from "scrollmap";

(function() {
        const Site = {
            init() {
                this.animations();
                this.collectionSorting();
            },
            animations() {
                //all image headers get animation class
                $(".Parallax-host img").addClass("animate");

                //targeting image block 2.0s for animation
                Scrollmap.trigger({
                    target: '.image-block-v2',
                    surfaceVisible: 0.3
                });
            },
            collectionSorting() {
                //wines and vineyard pages have a clickable custom toggle UI

                //set the first item to active in the menu
                $(".collection-list.nav .item:nth-child(1)").addClass("active");
                $(".wines .media-wrapper:nth-child(1)").addClass("active");

                //set the first content item to active
                const firstItem = $(".wines .media-wrapper:nth-child(1)").clone();

                if (firstItem) {
                    $(".collection-list.nav .item:nth-child(1)").find(".mobile-inject").html(firstItem).addClass("active");
                }

                //bind click events in the nav
                $(".collection-list.nav .item").on("click", (e) => {

                    const isActive = $(e.currentTarget).hasClass("active");

                    const id = $(e.currentTarget).attr("data-id");

                    const clone = $(".collection-content .media-wrapper[data-id=" + id + "]").clone();

                    if (isActive) {
                        $(".collection-list.nav .item").removeClass("active");
                    } else {
                        $(".collection-list.nav .item").removeClass("active");
                        $(e.currentTarget).addClass("active");
                    }

                    //clear the previous selection and toggle the next selection
                    $(".collection-list.nav .item .mobile-inject").removeClass("active");

                    const target = $(e.currentTarget).find(".mobile-inject");

                    $(target).html(clone).addClass("active");

                    //handle scrolling UI when mobile
                    if (window.innerWidth < 1024) {

                        if (isActive) {

                            $(e.currentTarget, target).removeClass("active");
                            $(".collection-list.nav .item .mobile-inject").removeClass("active");
                            $('html, body').animate({
                                scrollTop: ($(".collection-list.nav").offset().top - 70)
                            }, 500);

                        } else {
                            setTimeout(() => {

                                $('html, body').animate({
                                    scrollTop: ($(e.currentTarget).offset().top - 70)
                                }, 500);

                            }, 200);
                        }
                    }
                    //desktop            
                    $(".main-image").addClass("hide");
                    //toggle currently active content and nav items
                    $(".collection-content .media-wrapper").removeClass("active");
                    $(".collection-content .media-wrapper[data-id=" + id + "]").addClass("active");
                });

                //on vineyards page, clicking on the title displays the main map image again
                $("#collection-598c7e099f7456493d10168a .menu-nav.destop h3").on("click", () => {
                    $(".collection-content .media-wrapper").removeClass("active");
                    $(".main-image").removeClass("hide");
                    $(".collection-list.nav .item").removeClass("active");
                });
            }
        };

        Site.init();

})();