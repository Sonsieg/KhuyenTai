import { ImageProps, ViewProps } from 'react-native';

  interface BoxProps extends ViewProps {
    background?: string;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justify?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
    align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
    flex?: number;
    square?: number;
    circle?: number;
    shadowDepth?: number;
    width?: string | number;
    height?: string | number;
    margin?: number | [number, number] | [number, number, number, number];
    padding?: number | [number, number] | [number, number, number, number];
  }

  interface ImageIconProps extends ImageProps {
    size?: number;
    boxProps?: BoxProps;
    margin?: number | [number, number] | [number, number, number, number];
    padding?: number | [number, number] | [number, number, number, number];
    pressable?: boolean;
    name: 'AddressIcon' | 'DeliveryInstruction' | 'ExpressDelivery' | 'LocationList' | 'LocationList2x' | 'SearchMap' | 'StandardDelivery' | 'UATP_gray' | 'about_us_icon' | 'aboutus' | 'aboutus_icon' | 'account' | 'add_to_bag' | 'address' | 'addressBook' | 'address_book' | 'address_book_icon' | 'address_map' | 'addressbooknew' | 'amex_card' | 'amex_card_gray' | 'apple' | 'apple_white' | 'arrow-right' | 'arrow_down' | 'arrow_down_big' | 'arrow_down_red' | 'arrow_left_black' | 'arrow_left_white' | 'arrow_right_black' | 'arrow_up' | 'bag_out_off_stock' | 'bancontact_card_gray' | 'barcode_white' | 'better_magnifier' | 'bin' | 'black_check' | 'blue_arrow' | 'bold_minus' | 'bold_plus' | 'browse' | 'calendar' | 'camera-red' | 'camera_black' | 'camera_flip' | 'camera_gray' | 'camera_search' | 'camera_white' | 'cancel_refund_icon' | 'card_cvv' | 'cart_red' | 'cart_with_item' | 'cartes_bancaires_card_gray' | 'category-search-icon' | 'category_hide_red' | 'category_hide_white' | 'change_password_icon' | 'check' | 'check_black' | 'check_purple' | 'check_red' | 'check_white' | 'checkbox_active' | 'checked' | 'checked_default' | 'checked_default_d8' | 'checked_purple' | 'checked_purple2' | 'circle_unchecked' | 'circle_with_dot' | 'close-popup' | 'close' | 'close_black' | 'close_gray' | 'close_white' | 'compare' | 'compare_list' | 'compare_list_active' | 'compress' | 'compress_white' | 'creditCard' | 'currentLocation' | 'current_location' | 'dankort_card_gray' | 'default_card' | 'delete_account' | 'delete_text' | 'delivery_instruction' | 'deliveryoptionn' | 'desktop' | 'diners_card' | 'diners_card_gray' | 'discount' | 'discountVoucher' | 'discover_card' | 'discover_card_gray' | 'download' | 'edit' | 'elo_card' | 'elo_card_gray' | 'emptyOrderIcon' | 'empty_cart' | 'emptycompare' | 'equal' | 'expand' | 'expand_white' | 'express' | 'express_delivery' | 'extend_bar' | 'eye_hide' | 'eye_show' | 'facebook' | 'filter' | 'filter_active' | 'flash-off' | 'flash-open' | 'gallery_black' | 'gallery_white' | 'google' | 'gourment_market' | 'gourment_market_row' | 'gourmet_market_black' | 'gps_dark_purple' | 'gray_magnifier' | 'guard' | 'header-shipto-icon' | 'heart-red' | 'heart' | 'heart_empty' | 'heart_purple' | 'heart_white' | 'helpSupport' | 'help_support_icon' | 'help_support_icon_new' | 'hipercard_gray' | 'home' | 'i_icon' | 'i_icon_yellow' | 'icon_cvv' | 'icon_home' | 'inbox' | 'inboxnew' | 'info' | 'jcb' | 'jcb_card' | 'jcb_card_gray' | 'light_bulb' | 'lightbulb_new' | 'lightbulb_white' | 'lightbulb_yellow' | 'like_circle' | 'line_icon' | 'liveChat' | 'live_chat_icon' | 'location_list' | 'lock' | 'logo' | 'logout' | 'm_icon' | 'maestro_card' | 'maestro_card_gray' | 'magnifier' | 'map' | 'mark_in_circle_location' | 'mark_in_location' | 'mark_location_icon' | 'mastercard' | 'mastercard_gray' | 'mcard' | 'message' | 'message_icon' | 'mini_map' | 'minus' | 'minus_black' | 'mpoint' | 'mute' | 'no-connection' | 'norton' | 'orderTracking' | 'order_tracking_icon' | 'ordertrackingnew' | 'outofstock_big_line' | 'outofstock_line' | 'pause' | 'paymentCard' | 'payment_card_icon' | 'paymentcardnew' | 'phone' | 'photo_button_active' | 'photo_button_inactive' | 'play' | 'plus' | 'plus_image' | 'plus_red' | 'plus_white' | 'point' | 'point_black' | 'promotion' | 'qr-bt' | 'qr_button_active' | 'qr_button_inactive' | 'qr_scan' | 'qty_increase' | 'qty_increase_active' | 'qty_reduce' | 'qty_reduce_not_active' | 'radio_checked' | 'recentlyViewed' | 'recently_viewed_black' | 'recently_viewed_icon' | 'red_checkmark' | 'red_mark_location' | 'redeem_info' | 'referralcode' | 'refund' | 'remove' | 'remove_black' | 'remove_compare' | 'remove_white' | 'return' | 'return_exchange_icon' | 'returnsExchange' | 'review' | 'review_icon' | 'review_thumb_up' | 'review_thumb_up_purple' | 'search-result' | 'search_icon' | 'search_icon_gray' | 'selected_account' | 'selected_browse' | 'selected_compare_list' | 'selected_inbox' | 'selected_promotion' | 'send_email' | 'setDefaultCard' | 'setting_icon' | 'settings' | 'share' | 'share_product' | 'shoppingbag' | 'shoppingbag_button' | 'shoppingbagempty' | 'show_more_arrow' | 'sort' | 'spinning' | 'spinning_white' | 'standard' | 'standard_delivery' | 'standard_truck' | 'star' | 'star_gray' | 'star_half' | 'star_yellow' | 'suggestion-icon' | 'text_m' | 'thankyou_address' | 'thankyou_instruction' | 'thankyou_user' | 'thick_x' | 'tmg_card' | 'tracking_address' | 'tracking_chat' | 'tracking_user' | 'unchecked_box' | 'unionpay' | 'unionpay_new' | 'unionpay_new_gray' | 'unmute' | 'uploadPhoto' | 'user' | 'v_pay_gray' | 'video_play' | 'video_play_white' | 'visa' | 'visa_card' | 'visa_card_gray' | 'visa_electron_gray' | 'voucher_icon' | 'white-arrow' | 'white_check' | 'white_info' | 'white_lock' | 'wishlist_icon' | 'wishlist_option' | 'yellow_star';
  }
  
  export default function ImageIcon(props: ImageIconProps): {};
  