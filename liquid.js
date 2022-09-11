
(async function () {
    const BUSINESS_ID = "6304aa113cb8eba9248eac8d";
    // const BUSINESS_ID = businessData._id;
    const LOGO = 'logo.webp';
    // const LOGO = businessData.logo;
    const HEADER_LOGO_IMAGAE = `https://www.soppiya.com/media/images/${BUSINESS_ID}/business/${LOGO}`;
    const PRIMARY_COLOR = `#FFC312`;
    typeof handleNotification === "function" && handleNotification(true, true);

    (function headerLogo() {
        const businessLogo = document.getElementById("s001_business_logo");
        businessLogo.setAttribute("src", `${HEADER_LOGO_IMAGAE}`);

        businessLogo.addEventListener("click", function () {
            typeof handleNavigate === "function" && handleNavigate("/");
        });
    })();

    let hamburgerIcon = document.querySelectorAll(".s001_openSidebar_Hamburger_Icon");
    const mobileHamburger = document.getElementById("s001_hamburger_icon");
    const tabHamburger = document.getElementById("s001_tab_hamburger_icon");
    const largeDeviceHamburger = document.getElementById("s001_large_device_hamburger");
    const rotedIcon = document.getElementById("s001_categories_area_inner_content_right_id");
    const sidebarMainWrapper = document.getElementById("s001_liquid_header_main_wrapper");
    const catagoriesMainDiv = document.getElementById("s001_categories_navigation");
    const s001_categories_area = document.getElementById("s001_categories_area");

    (function openSidebar() {
        for (singleHamburger of hamburgerIcon) {
            singleHamburger.addEventListener("click", function (e) {
                sidebarMainWrapper.classList.toggle("openSidebar");
                mobileHamburger.classList.toggle("toggle_icon");
                tabHamburger.classList.toggle("toggle_icon");
                catagoriesMainDiv.classList.toggle("openCategories");
                largeDeviceHamburger.classList.toggle("toggle_icon");
                rotedIcon.classList.toggle("toggle_icon");

            });
        }
    })();

    const handleLargeDeviceSidebar = () => {
        const s001_categories_area = document.getElementById("s001_categories_area");
        window.addEventListener("click", function (e) {
            const targetArea = s001_categories_area.contains(e.target);
            if (targetArea) {
                catagoriesMainDiv.classList.toggle("openCategories");
                largeDeviceHamburger.classList.toggle("toggle_icon");
                rotedIcon.classList.toggle("toggle_icon");
            } else if (!targetArea) {
                catagoriesMainDiv.classList.remove("openCategories");
                largeDeviceHamburger.classList.remove("toggle_icon");
                rotedIcon.classList.remove("toggle_icon");
            }
        });
    }
    handleLargeDeviceSidebar();
    (function sidebarHandle() {
        const sidebarParentDiv = document.getElementById("s001_liquid_header_main_wrapper");
        const sidebarContentDiv = document.getElementById("s001_categories_area");
        sidebarParentDiv.addEventListener("click", function (e) {
            const notTagetDiv = sidebarContentDiv.contains(e.target);
            if (!notTagetDiv) {
                sidebarMainWrapper.classList.remove("openSidebar");
                mobileHamburger.classList.remove("toggle_icon");
                tabHamburger.classList.remove("toggle_icon");
            }
        });
    })();

    const LoadDataFunction = async (url) => { try { let response = await fetch(url, { method: "get", headers: { "businessid": `${BUSINESS_ID}` } }); response = await response.json(); if (response.Error) { return console.log(response.Error) }; return response; } catch (e) { return }; };

    const socialDataItem = await LoadDataFunction(`https://api.soppiya.com/v2.1/widget/header/social`);

    const showSocialIconData = async (socialDataItem) => {
        for (let i = 0; i < socialDataItem.length; i++) {
            const element = socialDataItem[i];
            const IconLi = elementMaker("li", ["s001_social_nav_item"]);
            const IconLink = elementMaker("a", ["s001_social_nav_link"]);
            IconLink.setAttribute("src", `${element.url}`);
            IconLink.innerHTML = `${element.svg}`;
            IconLi.appendChild(IconLink);
            IconLink.children[0].children[0].lastChild.style.fill = `${PRIMARY_COLOR}`;
            document.getElementById("s001_social_nav_list_id").appendChild(IconLi);
            IconLi.addEventListener("click", () => {
                window.open(`${element.url}`, "_blank");
                console.log("url link", `${element.url}`);
            });
        };
    };
    await showSocialIconData(socialDataItem);

    let scrrenWidth = document.body.clientWidth;
    console.log("scrrenWidth", scrrenWidth);

    document.getElementById("s001_home_icon").addEventListener("click", function () {
        typeof handleNavigate === "function" && handleNavigate("/");
        console.log("/");
    });

    let legalPagesData = await LoadDataFunction(`https://api.soppiya.com/v2.1/widget/header/page`);
    async function showLegalPage(legalPagesData) {
        for (let i = 0; i < legalPagesData.length; i++) {
            const element = legalPagesData[i];
            let pageLi = elementMaker("li", ["s001_liquid_header_main_nav_item"]);
            let InnerSpan = elementMaker("span", ["s001_liquid_header_main_nav_link"]);
            InnerSpan.innerText = `${element.title}`;
            pageLi.appendChild(InnerSpan);
            document.getElementById("s001_legal_Page_common_nav_list_sidebar").appendChild(pageLi);
            pageLi.addEventListener("click", function () {
                typeof handleNavigate === "function" && handleNavigate(`/page/${element.slug}`);
                console.log(`/page/${element.slug}`);
            });

        }
    };
    await showLegalPage(legalPagesData);

    async function showLegalPageSidebar(legalPagesData) {
        for (let i = 0; i < legalPagesData.length; i++) {
            const element = legalPagesData[i];
            let pageLi = elementMaker("li", ["s001_liquid_header_main_nav_item"]);
            let InnerSpan = elementMaker("span", ["s001_liquid_header_main_nav_link"]);
            InnerSpan.innerText = `${element.title}`;
            pageLi.appendChild(InnerSpan);
            document.getElementById("s001_legal_Page_common_nav_list_home").appendChild(pageLi);
            pageLi.addEventListener("click", function () {
                typeof handleNavigate === "function" && handleNavigate(`page/${element.slug}`);
                console.log(`page/${element.slug}`);
                sidebarMainWrapper.classList.remove("openSidebar");
                mobileHamburger.classList.remove("toggle_icon");
                tabHamburger.classList.remove("toggle_icon");
            });
        }
    };
    await showLegalPageSidebar(legalPagesData);
    const catagoriesSingleItem = await LoadDataFunction(`https://api.soppiya.com/v2.1/widget/header/category`);

    const showCatagoriesData = async (catagoriesSingleItem) => {

        for (let i = 0; i < catagoriesSingleItem.length; i++) {
            const element = catagoriesSingleItem[i];
            const catagoiresLi = elementMaker("li", ["s001_categories_nav_item"]);
            const ItemContentSpan = elementMaker("span", ["s001_categories_nav_link"]);
            ItemContentSpan.innerHTML = `${element.name}`;
            catagoiresLi.appendChild(ItemContentSpan);
            document.getElementById("s001_categories_nav_list_id").appendChild(catagoiresLi);
            catagoiresLi.addEventListener("click", function () {
                typeof handleNavigate === "function" && handleNavigate(`/category/${element._id}`);
                console.log(`/category/${element._id}`);
                sidebarMainWrapper.classList.remove("openSidebar");
                mobileHamburger.classList.remove("toggle_icon");
                tabHamburger.classList.remove("toggle_icon");
            });
        }

    };
    await showCatagoriesData(catagoriesSingleItem);

    const mobile_search_field = document.getElementById("s001_form_controls");
    const s001_tab_search_icon = document.getElementById("s001_tab_search_icon");
    const s001_tab_search_box = document.getElementById("s001_header_search_box_wrapper");

    async function searchHandle() {
        const commonSearchIcon = document.querySelectorAll(".s001_common_search_icon");
        for (singleSearchIcon of commonSearchIcon) {
            singleSearchIcon.addEventListener("click", function () {
                mobile_search_field.classList.add("s001_search_field_show");
                s001_search_icon.classList.add("s001_search_field_show");
                s001_tab_search_box.classList.add("s001_tab_search_popup");
            });
        };
    };
    await searchHandle();

    const handleSearchPopup = () => {
        const mobile_search_icon = document.getElementById("s001_search_icon");
        const s001_tab_search_icon = document.getElementById("s001_tab_search_icon");
        window.addEventListener("click", function (e) {
            let targetArea = mobile_search_icon.contains(e.target);
            let tabTargetArea = s001_tab_search_icon.contains(e.target);
            let mobileFieldTaget = mobile_search_field.contains(e.target);
            let tabBoxTarget = s001_tab_search_box.contains(e.target);
            if (targetArea && tabTargetArea && mobileFieldTaget && tabBoxTarget) {
                mobile_search_field.classList.add("s001_search_field_show");
                s001_search_icon.classList.add("s001_search_field_show");
                s001_tab_search_box.classList.add("s001_tab_search_popup");
            } else if (!targetArea && !tabTargetArea && !mobileFieldTaget && !tabBoxTarget) {
                mobile_search_field.classList.remove("s001_search_field_show");
                s001_search_icon.classList.remove("s001_search_field_show");
                s001_tab_search_box.classList.remove("s001_tab_search_popup");
            }
        });
    };
    handleSearchPopup();

    (function getSearchInputFromUser() {
        document.getElementById("s001_form_controls").addEventListener("input", function (e) {

            let inputValue = e.target.value;
            setTimeout(() => {
                if (inputValue?.length > 0) {
                    loadSearchData(inputValue);

                } else {
                    const searchResultParentDiv = document.getElementById("s001_search_field_suggession_inner_content_id");
                    searchResultParentDiv.textContent = "";
                };
            }, 300);
        });
    })();

    let delayForInput = 0;
    const loadSearchData = async (inputValue) => {
        if (delayForInput) {
            clearTimeout(delayForInput);
        }
        delayForInput = setTimeout(async () => {
            const getSearchData = async (url) => { try { let response = await fetch(url, { method: "get", headers: { "businessid": `${BUSINESS_ID}` } }); response = await response.json(); if (response.Error) { return console.log(response.Error) }; return response; } catch (e) { return }; };
            if (inputValue?.length > 0) {
                const searchResult = await getSearchData(`https://api.soppiya.com/v2.1/widget/header/search?q=${inputValue}`);
                if (document.getElementById("s001_search_field_suggession_inner_content_id").childNodes) {
                    document.getElementById("s001_search_field_suggession_inner_content_id").textContent = "";
                }
                if (searchResult.length === 0 || typeof searchResult === "undefined") {
                    const notFound = elementMaker("div", ["s001_suggession_item"]);
                    notFound.innerText = `No Item Found`;
                    document.getElementById("s001_search_field_suggession_inner_content_id").appendChild(notFound);

                } else {
                    const notFound = elementMaker("div", ["s001_suggession_item"]);
                    notFound.innerText = "";
                    await showSearchResult(searchResult);
                };
            };
        }, 400);

    };
    await loadSearchData();

    async function showSearchResult(searchResult) {
        if (searchResult?.length > 0) {
            for (let i = 0; i < searchResult.length; i++) {
                const element = searchResult[i];
                let resultItemLi = elementMaker("div", ["s001_suggession_item"]);
                resultItemLi.innerHTML = `${element.name}`;
                document.getElementById("s001_search_field_suggession_inner_content_id").appendChild(resultItemLi);
                resultItemLi.addEventListener("click", () => {
                    typeof handleNavigate === "function" && handleNavigate(`/item/${element.slug}`);
                    const searchResultParentDiv = document.getElementById("s001_search_field_suggession_inner_content_id");
                    searchResultParentDiv.textContent = "";
                    console.log("search item cliked", `/item/${element.slug}`);
                });
            };
        };
    };
    await showSearchResult();
    (function closeSearchResultPopup() {
        const searchResultParentDiv = document.getElementById("s001_search_field_suggession_inner_content_id");
        const InputField = document.getElementById("s001_form_controls");
        window.addEventListener("click", function (e) {
            const targetArea = searchResultParentDiv.contains(e.target);
            const targetInputField = InputField.contains(e.target);
            if (!targetArea && !targetInputField) {
                searchResultParentDiv.textContent = "";
                InputField.value = "";
            };
        });
    })();

    function cartWishlistHandler() {
        document.getElementById("s001_header_cart").addEventListener("click", function () { cartWishlistRouteNavigate("/cart") });
        document.getElementById("s001_mobile_cart_icon").addEventListener("click", function () { cartWishlistRouteNavigate("/cart") });
        document.getElementById("s001_header_wishlist").addEventListener("click", function () { cartWishlistRouteNavigate("/wishlist") });
        document.getElementById("s001_mobile_wishlist_icon").addEventListener("click", function () { cartWishlistRouteNavigate("/wishlist") });
    };
    cartWishlistHandler();

    function cartWishlistRouteNavigate(path) {
        typeof handleNavigate === "function" && handleNavigate(`${path}`);
        console.log(`${path}`);
    };

    window.notificationAlert = (type, count) => {
        if (type === "cart") {
            if (count > 0) {
                document.getElementById("s001_header_cart").classList.add("s001_active_notification");
                document.getElementById("s001_mobile_cart_icon").classList.add("s001_active_notification");
            } else {
                document.getElementById("s001_header_cart").classList.remove("s001_active_notification");
                document.getElementById("s001_mobile_cart_icon").classList.remove("s001_active_notification");
            }
        } else if (type === "wishlist") {
            if (count > 0) {
                document.getElementById("s001_header_wishlist").classList.add("s001_active_notification");
                document.getElementById("s001_mobile_wishlist_icon").classList.add("s001_active_notification");
            } else {
                document.getElementById("s001_header_wishlist").classList.remove("s001_active_notification");
                document.getElementById("s001_mobile_wishlist_icon").classList.remove("s001_active_notification");
            };
        };
    };

    function addNotification() {
        window.notificationAlert = (type, count) => {
            if (type === "cart") {
                if (count > 0) {
                    document.getElementById("s001_header_cart").classList.add("s001_active_notification");
                    document.getElementById("s001_mobile_cart_icon").classList.add("s001_active_notification");
                } else {
                    document.getElementById("s001_header_cart").classList.remove("s001_active_notification");
                    document.getElementById("s001_mobile_cart_icon").classList.remove("s001_active_notification");
                }
            } else if (type === "wishlist") {
                if (count > 0) {
                    document.getElementById("s001_header_wishlist").classList.add("s001_active_notification");
                    document.getElementById("s001_mobile_wishlist_icon").classList.add("s001_active_notification");
                } else {
                    document.getElementById("s001_header_wishlist").classList.remove("s001_active_notification");
                    document.getElementById("s001_mobile_wishlist_icon").classList.remove("s001_active_notification");
                };
            };
        };
    }
    addNotification();
    document.getElementById("s001_header_wishlist").addEventListener("click", function () {
        addNotification();
        if (document.getElementById("s001_header_wishlist").classList.contains("s001_active_notification") && document.getElementById("s001_mobile_wishlist_icon").classList.contains("s001_active_notification")) {
            document.getElementById("s001_header_wishlist").classList.remove("s001_active_notification");
            document.getElementById("s001_mobile_wishlist_icon").classList.remove("s001_active_notification");
        };
    });
    document.getElementById("s001_header_cart").addEventListener("click", function () {
        addNotification();
        if (document.getElementById("s001_header_cart").classList.contains("s001_active_notification") && document.getElementById("s001_mobile_cart_icon").classList.contains("s001_active_notification")) {
            document.getElementById("s001_header_cart").classList.remove("s001_active_notification");
            document.getElementById("s001_mobile_cart_icon").classList.remove("s001_active_notification");
        };
    });

    document.getElementById("s001_mobile_wishlist_icon").addEventListener("click", function () {
        if (document.getElementById("s001_header_wishlist").classList.contains("s001_active_notification") && document.getElementById("s001_mobile_wishlist_icon").classList.contains("s001_active_notification")) {
            document.getElementById("s001_header_wishlist").classList.remove("s001_active_notification");
            document.getElementById("s001_mobile_wishlist_icon").classList.remove("s001_active_notification");
        };
    });
    document.getElementById("s001_mobile_cart_icon").addEventListener("click", function () {
        if (document.getElementById("s001_header_cart").classList.contains("s001_active_notification") && document.getElementById("s001_mobile_cart_icon").classList.contains("s001_active_notification")) {
            document.getElementById("s001_header_cart").classList.remove("s001_active_notification");
            document.getElementById("s001_mobile_cart_icon").classList.remove("s001_active_notification");
        };
    });

    const allCartWishlist = document.querySelectorAll(".s001_headerWishlistCart_common");
    function activeFill() {
        allCartWishlist.forEach((item) => {
            item.addEventListener("click", function () {
                removeFillColor();
                item.classList.add('s001_active_fill');
            });
        });
    };
    activeFill();

    function removeFillColor() {
        let footerMenuItem = document.querySelectorAll(".s001_headerWishlistCart_common");
        for (singleItem of footerMenuItem) {
            singleItem.classList.contains("s001_active_fill") && singleItem.classList.remove("s001_active_fill");
        };
    };

    function checkUserLoginStatus() {
        let checkUserLoginStaus = typeof handleUserAuth === "function" && handleUserAuth("check", {});
        return checkUserLoginStatus.status;
    };

    function hnadleNavigationAccountRoute() {
        if (checkUserLoginStatus() === true) { typeof handleAutn === "function" && handleAutn("/account"); };
    };

    function accountClickHandler() {
        document.getElementById("s001_user_profile_icon_id").addEventListener("click", function () {
            hnadleNavigationAccountRoute();
        })
        document.getElementById("s001_mobile_user_profile_icon").addEventListener("click", function () {
            hnadleNavigationAccountRoute();
        });
    };
    accountClickHandler();

    function loginbadgeShow() {
        if (checkUserLoginStatus === true) {
            if (!document.getElementById("s001_user_profile_icon_id").classList.contains("s001_active_notification")) {
                document.getElementById("s001_user_profile_icon_id").classList.add("s001_active_notification");
            }
            if (!document.getElementById("s001_mobile_user_profile_icon").classList.contains("s001_active_notification")) {
                document.getElementById("s001_mobile_user_profile_icon").classList.add("s001_active_notification");
            }
        } else if (checkUserLoginStatus === false) {
            if (document.getElementById("s001_user_profile_icon_id").classList.contains("s001_active_notification")) {
                document.getElementById("s001_user_profile_icon_id").classList.remove("s001_active_notification");
            }
            if (document.getElementById("s001_user_profile_icon_id").classList.contains("s001_active_notification")) {
                document.getElementById("s001_mobile_user_profile_icon").classList.remove("s001_active_notification");
            }
        }
    };

    const footerMenuList = document.querySelectorAll(".s001_footer_menu_list");
    function activeMenu() {
        footerMenuList.forEach((item) => {
            item.addEventListener("click", function () {
                removeActiveMenu();
                item.classList.add('s001_footer_menu_active');
            });
        });
    };
    activeMenu();

    function removeActiveMenu() {
        let footerMenuItem = document.querySelectorAll(".s001_footer_menu_list");
        for (singleItem of footerMenuItem) {
            singleItem.classList.contains("s001_footer_menu_active") && singleItem.classList.remove("s001_footer_menu_active");
        };
    };
    const curbeParent = document.querySelector("#curbeParent");
    const container = document.querySelector("#contentContainer");
    const footerListItem = document.querySelectorAll(".s001_footer_menu_list");
    window.addEventListener("resize", function () {
        footerListItem.forEach(singleFooterItem => {
            if (singleFooterItem.classList.contains("s001_footer_menu_active")) {
                curbeParent.style.left = singleFooterItem.getBoundingClientRect().left - 17 + 'px';
            }
        });
        footerListItem.forEach(key => {
            key.addEventListener('click', function (e) {
                let position = this.getBoundingClientRect().left - 17;
                curbeParent.style.left = position + 'px';

            });
        });
    });
    function elementMaker(name, className, id) {
        try {
            let element = document.createElement(name);
            className && (element.className = className.join(" "));
            id && (element.id = id);
            return element;
        } catch (err) { };
    };
    function setAttributes(elementName, allAttributes) {
        for (let key in allAttributes) {
            elementName.setAttribute(key, allAttributes[key]);
        };
    };

})();