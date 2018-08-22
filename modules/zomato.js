const util = require('util');
const request = require('request');
const zomato = require('zomato');
const config = require('../bot.json');

module.exports = {

	// Entity: 119179 (Strip District)
	// Entity Type: subzone
	// City: 1081 (Pittsburgh)
	//
	// Sample Data:
	//
	// {
	//   "location": {
	//     "entity_type": "subzone",
	//     "entity_id": 119179,
	//     "title": "Strip District",
	//     "latitude": "40.4518134085",
	//     "longitude": "-79.9837103595",
	//     "city_id": 1081,
	//     "city_name": "Pittsburgh",
	//     "country_id": 216,
	//     "country_name": "United States"
	//   },
	//   "popularity": {
	//     "popularity": "3.71",
	//     "nightlife_index": "2.73",
	//     "nearby_res": [
	//       "17037219",
	//       "17036710",
	//       "17036305",
	//       "17037065",
	//       "17037721",
	//       "17041480",
	//       "17037105",
	//       "17036389",
	//       "17041562"
	//     ],
	//     "top_cuisines": [
	//       "American",
	//       "Sandwich",
	//       "Italian",
	//       "Coffee and Tea",
	//       "Pizza"
	//     ],
	//     "popularity_res": "100",
	//     "nightlife_res": "10",
	//     "subzone": "Troy Hill",
	//     "subzone_id": 118792,
	//     "city": "Pittsburgh"
	//   },
	//   "link": "https://www.zomato.com/pittsburgh/strip-district-restaurants",
	//   "nearby_restaurants": [
	//     {
	//       "restaurant": {
	//         "R": {
	//           "res_id": 17037219
	//         },
	//         "apikey": "752243a8ab50024dece9c7797e161222",
	//         "id": "17037219",
	//         "name": "Primanti Brothers",
	//         "url": "https://www.zomato.com/pittsburgh/primanti-brothers-3-pittsburgh?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
	//         "location": {
	//           "address": "46 18th Street, Pittsburgh 15222",
	//           "locality": "Strip District",
	//           "city": "Pittsburgh",
	//           "city_id": 1081,
	//           "latitude": "40.4506260000",
	//           "longitude": "-79.9855030000",
	//           "zipcode": "15222",
	//           "country_id": 216,
	//           "locality_verbose": "Strip District, Pittsburgh"
	//         },
	//         "switch_to_order_menu": 0,
	//         "cuisines": "American, Fast Food, Sandwich",
	//         "average_cost_for_two": 10,
	//         "price_range": 1,
	//         "currency": "$",
	//         "offers": [],
	//         "opentable_support": 0,
	//         "is_zomato_book_res": 0,
	//         "mezzo_provider": "OTHER",
	//         "is_book_form_web_view": 0,
	//         "book_form_web_view_url": "",
	//         "book_again_url": "",
	//         "thumb": "",
	//         "user_rating": {
	//           "aggregate_rating": "4.1",
	//           "rating_text": "Very Good",
	//           "rating_color": "5BA829",
	//           "votes": "1178"
	//         },
	//         "photos_url": "https://www.zomato.com/pittsburgh/primanti-brothers-3-pittsburgh/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
	//         "menu_url": "https://www.zomato.com/pittsburgh/primanti-brothers-3-pittsburgh/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
	//         "featured_image": "",
	//         "has_online_delivery": 0,
	//         "is_delivering_now": 0,
	//         "include_bogo_offers": true,
	//         "deeplink": "zomato://restaurant/17037219",
	//         "is_table_reservation_supported": 0,
	//         "has_table_booking": 0,
	//         "events_url": "https://www.zomato.com/pittsburgh/primanti-brothers-3-pittsburgh/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1"
	//       }
	//     },
	//     {
	//       "restaurant": {
	//         "R": {
	//           "res_id": 17036710
	//         },
	//         "apikey": "752243a8ab50024dece9c7797e161222",
	//         "id": "17036710",
	//         "name": "Kaya",
	//         "url": "https://www.zomato.com/pittsburgh/kaya-pittsburgh?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
	//         "location": {
	//           "address": "2000 Smallman St, Pittsburgh 15222",
	//           "locality": "Strip District",
	//           "city": "Pittsburgh",
	//           "city_id": 1081,
	//           "latitude": "40.4516990000",
	//           "longitude": "-79.9844440000",
	//           "zipcode": "15222",
	//           "country_id": 216,
	//           "locality_verbose": "Strip District, Pittsburgh"
	//         },
	//         "switch_to_order_menu": 0,
	//         "cuisines": "Caribbean, Seafood, Vegetarian",
	//         "average_cost_for_two": 40,
	//         "price_range": 3,
	//         "currency": "$",
	//         "offers": [],
	//         "opentable_support": 0,
	//         "is_zomato_book_res": 0,
	//         "mezzo_provider": "OTHER",
	//         "is_book_form_web_view": 0,
	//         "book_form_web_view_url": "",
	//         "book_again_url": "",
	//         "thumb": "",
	//         "user_rating": {
	//           "aggregate_rating": "4.5",
	//           "rating_text": "Excellent",
	//           "rating_color": "3F7E00",
	//           "votes": "994"
	//         },
	//         "photos_url": "https://www.zomato.com/pittsburgh/kaya-pittsburgh/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
	//         "menu_url": "https://www.zomato.com/pittsburgh/kaya-pittsburgh/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
	//         "featured_image": "",
	//         "has_online_delivery": 0,
	//         "is_delivering_now": 0,
	//         "include_bogo_offers": true,
	//         "deeplink": "zomato://restaurant/17036710",
	//         "is_table_reservation_supported": 0,
	//         "has_table_booking": 0,
	//         "events_url": "https://www.zomato.com/pittsburgh/kaya-pittsburgh/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1"
	//       }
	//     },
	//     {
	//       "restaurant": {
	//         "R": {
	//           "res_id": 17036305
	//         },
	//         "apikey": "752243a8ab50024dece9c7797e161222",
	//         "id": "17036305",
	//         "name": "Deluca's",
	//         "url": "https://www.zomato.com/pittsburgh/delucas-pittsburgh?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
	//         "location": {
	//           "address": "2015 Penn Ave, Pittsburgh 15222",
	//           "locality": "Strip District",
	//           "city": "Pittsburgh",
	//           "city_id": 1081,
	//           "latitude": "40.4513560000",
	//           "longitude": "-79.9839150000",
	//           "zipcode": "15222",
	//           "country_id": 216,
	//           "locality_verbose": "Strip District, Pittsburgh"
	//         },
	//         "switch_to_order_menu": 0,
	//         "cuisines": "Breakfast, Coffee and Tea, Sandwich",
	//         "average_cost_for_two": 10,
	//         "price_range": 1,
	//         "currency": "$",
	//         "offers": [],
	//         "opentable_support": 0,
	//         "is_zomato_book_res": 0,
	//         "mezzo_provider": "OTHER",
	//         "is_book_form_web_view": 0,
	//         "book_form_web_view_url": "",
	//         "book_again_url": "",
	//         "thumb": "",
	//         "user_rating": {
	//           "aggregate_rating": "4.3",
	//           "rating_text": "Very Good",
	//           "rating_color": "5BA829",
	//           "votes": "530"
	//         },
	//         "photos_url": "https://www.zomato.com/pittsburgh/delucas-pittsburgh/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
	//         "menu_url": "https://www.zomato.com/pittsburgh/delucas-pittsburgh/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
	//         "featured_image": "",
	//         "has_online_delivery": 0,
	//         "is_delivering_now": 0,
	//         "include_bogo_offers": true,
	//         "deeplink": "zomato://restaurant/17036305",
	//         "is_table_reservation_supported": 0,
	//         "has_table_booking": 0,
	//         "events_url": "https://www.zomato.com/pittsburgh/delucas-pittsburgh/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1"
	//       }
	//     },
	//     {
	//       "restaurant": {
	//         "R": {
	//           "res_id": 17037065
	//         },
	//         "apikey": "752243a8ab50024dece9c7797e161222",
	//         "id": "17037065",
	//         "name": "Pamela's P & G Diner",
	//         "url": "https://www.zomato.com/pittsburgh/pamelas-p-g-diner-2-pittsburgh?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
	//         "location": {
	//           "address": "60 21st St, Pittsburgh 15222",
	//           "locality": "Strip District",
	//           "city": "Pittsburgh",
	//           "city_id": 1081,
	//           "latitude": "40.4525190000",
	//           "longitude": "-79.9843860000",
	//           "zipcode": "15222",
	//           "country_id": 216,
	//           "locality_verbose": "Strip District, Pittsburgh"
	//         },
	//         "switch_to_order_menu": 0,
	//         "cuisines": "American, Breakfast, Coffee and Tea",
	//         "average_cost_for_two": 10,
	//         "price_range": 1,
	//         "currency": "$",
	//         "offers": [],
	//         "opentable_support": 0,
	//         "is_zomato_book_res": 0,
	//         "mezzo_provider": "OTHER",
	//         "is_book_form_web_view": 0,
	//         "book_form_web_view_url": "",
	//         "book_again_url": "",
	//         "thumb": "",
	//         "user_rating": {
	//           "aggregate_rating": "4.4",
	//           "rating_text": "Very Good",
	//           "rating_color": "5BA829",
	//           "votes": "518"
	//         },
	//         "photos_url": "https://www.zomato.com/pittsburgh/pamelas-p-g-diner-2-pittsburgh/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
	//         "menu_url": "https://www.zomato.com/pittsburgh/pamelas-p-g-diner-2-pittsburgh/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
	//         "featured_image": "",
	//         "has_online_delivery": 0,
	//         "is_delivering_now": 0,
	//         "include_bogo_offers": true,
	//         "deeplink": "zomato://restaurant/17037065",
	//         "is_table_reservation_supported": 0,
	//         "has_table_booking": 0,
	//         "events_url": "https://www.zomato.com/pittsburgh/pamelas-p-g-diner-2-pittsburgh/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1"
	//       }
	//     },
	//     {
	//       "restaurant": {
	//         "R": {
	//           "res_id": 17037721
	//         },
	//         "apikey": "752243a8ab50024dece9c7797e161222",
	//         "id": "17037721",
	//         "name": "Chicken Latino",
	//         "url": "https://www.zomato.com/pittsburgh/chicken-latino-pittsburgh?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
	//         "location": {
	//           "address": "155 21st St, Pittsburgh 15222",
	//           "locality": "Strip District",
	//           "city": "Pittsburgh",
	//           "city_id": 1081,
	//           "latitude": "40.4516755000",
	//           "longitude": "-79.9830955000",
	//           "zipcode": "15222",
	//           "country_id": 216,
	//           "locality_verbose": "Strip District, Pittsburgh"
	//         },
	//         "switch_to_order_menu": 0,
	//         "cuisines": "Latin American",
	//         "average_cost_for_two": 10,
	//         "price_range": 1,
	//         "currency": "$",
	//         "offers": [],
	//         "opentable_support": 0,
	//         "is_zomato_book_res": 0,
	//         "mezzo_provider": "OTHER",
	//         "is_book_form_web_view": 0,
	//         "book_form_web_view_url": "",
	//         "book_again_url": "",
	//         "thumb": "",
	//         "user_rating": {
	//           "aggregate_rating": "4.3",
	//           "rating_text": "Very Good",
	//           "rating_color": "5BA829",
	//           "votes": "204"
	//         },
	//         "photos_url": "https://www.zomato.com/pittsburgh/chicken-latino-pittsburgh/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
	//         "menu_url": "https://www.zomato.com/pittsburgh/chicken-latino-pittsburgh/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
	//         "featured_image": "",
	//         "has_online_delivery": 0,
	//         "is_delivering_now": 0,
	//         "include_bogo_offers": true,
	//         "deeplink": "zomato://restaurant/17037721",
	//         "is_table_reservation_supported": 0,
	//         "has_table_booking": 0,
	//         "events_url": "https://www.zomato.com/pittsburgh/chicken-latino-pittsburgh/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1"
	//       }
	//     },
	//     {
	//       "restaurant": {
	//         "R": {
	//           "res_id": 17041480
	//         },
	//         "apikey": "752243a8ab50024dece9c7797e161222",
	//         "id": "17041480",
	//         "name": "Peace, Love and Little Donuts",
	//         "url": "https://www.zomato.com/pittsburgh/peace-love-and-little-donuts-pittsburgh?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
	//         "location": {
	//           "address": "2018 Smallman Street, Pittsburgh 15222",
	//           "locality": "Strip District",
	//           "city": "Pittsburgh",
	//           "city_id": 1081,
	//           "latitude": "40.4517750000",
	//           "longitude": "-79.9843600000",
	//           "zipcode": "15222",
	//           "country_id": 216,
	//           "locality_verbose": "Strip District, Pittsburgh"
	//         },
	//         "switch_to_order_menu": 0,
	//         "cuisines": "Coffee and Tea, Donuts",
	//         "average_cost_for_two": 10,
	//         "price_range": 1,
	//         "currency": "$",
	//         "offers": [],
	//         "opentable_support": 0,
	//         "is_zomato_book_res": 0,
	//         "mezzo_provider": "OTHER",
	//         "is_book_form_web_view": 0,
	//         "book_form_web_view_url": "",
	//         "book_again_url": "",
	//         "thumb": "",
	//         "user_rating": {
	//           "aggregate_rating": "3.1",
	//           "rating_text": "Average",
	//           "rating_color": "CDD614",
	//           "votes": "268"
	//         },
	//         "photos_url": "https://www.zomato.com/pittsburgh/peace-love-and-little-donuts-pittsburgh/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
	//         "menu_url": "https://www.zomato.com/pittsburgh/peace-love-and-little-donuts-pittsburgh/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
	//         "featured_image": "",
	//         "has_online_delivery": 0,
	//         "is_delivering_now": 0,
	//         "include_bogo_offers": true,
	//         "deeplink": "zomato://restaurant/17041480",
	//         "is_table_reservation_supported": 0,
	//         "has_table_booking": 0,
	//         "events_url": "https://www.zomato.com/pittsburgh/peace-love-and-little-donuts-pittsburgh/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1"
	//       }
	//     },
	//     {
	//       "restaurant": {
	//         "R": {
	//           "res_id": 17037105
	//         },
	//         "apikey": "752243a8ab50024dece9c7797e161222",
	//         "id": "17037105",
	//         "name": "Penn Brewery",
	//         "url": "https://www.zomato.com/pittsburgh/penn-brewery-troy-hill?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
	//         "location": {
	//           "address": "800 Vinial Street, Deutschtown 15212",
	//           "locality": "Troy Hill",
	//           "city": "Pittsburgh",
	//           "city_id": 1081,
	//           "latitude": "40.4568400000",
	//           "longitude": "-79.9913200000",
	//           "zipcode": "15212",
	//           "country_id": 216,
	//           "locality_verbose": "Troy Hill, Pittsburgh"
	//         },
	//         "switch_to_order_menu": 0,
	//         "cuisines": "German, Bar Food, Eastern European",
	//         "average_cost_for_two": 25,
	//         "price_range": 2,
	//         "currency": "$",
	//         "offers": [],
	//         "opentable_support": 0,
	//         "is_zomato_book_res": 0,
	//         "mezzo_provider": "OTHER",
	//         "is_book_form_web_view": 0,
	//         "book_form_web_view_url": "",
	//         "book_again_url": "",
	//         "thumb": "",
	//         "user_rating": {
	//           "aggregate_rating": "4.1",
	//           "rating_text": "Very Good",
	//           "rating_color": "5BA829",
	//           "votes": "247"
	//         },
	//         "photos_url": "https://www.zomato.com/pittsburgh/penn-brewery-troy-hill/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
	//         "menu_url": "https://www.zomato.com/pittsburgh/penn-brewery-troy-hill/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
	//         "featured_image": "",
	//         "has_online_delivery": 0,
	//         "is_delivering_now": 0,
	//         "include_bogo_offers": true,
	//         "deeplink": "zomato://restaurant/17037105",
	//         "is_table_reservation_supported": 0,
	//         "has_table_booking": 0,
	//         "events_url": "https://www.zomato.com/pittsburgh/penn-brewery-troy-hill/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1"
	//       }
	//     },
	//     {
	//       "restaurant": {
	//         "R": {
	//           "res_id": 17036389
	//         },
	//         "apikey": "752243a8ab50024dece9c7797e161222",
	//         "id": "17036389",
	//         "name": "Enrico Biscotti",
	//         "url": "https://www.zomato.com/pittsburgh/enrico-biscotti-pittsburgh?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
	//         "location": {
	//           "address": "2022 Penn Ave, Pittsburgh 15222",
	//           "locality": "Strip District",
	//           "city": "Pittsburgh",
	//           "city_id": 1081,
	//           "latitude": "40.4511890000",
	//           "longitude": "-79.9836230000",
	//           "zipcode": "15222",
	//           "country_id": 216,
	//           "locality_verbose": "Strip District, Pittsburgh"
	//         },
	//         "switch_to_order_menu": 0,
	//         "cuisines": "Breakfast, Italian",
	//         "average_cost_for_two": 25,
	//         "price_range": 2,
	//         "currency": "$",
	//         "offers": [],
	//         "opentable_support": 0,
	//         "is_zomato_book_res": 0,
	//         "mezzo_provider": "OTHER",
	//         "is_book_form_web_view": 0,
	//         "book_form_web_view_url": "",
	//         "book_again_url": "",
	//         "thumb": "",
	//         "user_rating": {
	//           "aggregate_rating": "4.2",
	//           "rating_text": "Very Good",
	//           "rating_color": "5BA829",
	//           "votes": "241"
	//         },
	//         "photos_url": "https://www.zomato.com/pittsburgh/enrico-biscotti-pittsburgh/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
	//         "menu_url": "https://www.zomato.com/pittsburgh/enrico-biscotti-pittsburgh/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
	//         "featured_image": "",
	//         "has_online_delivery": 0,
	//         "is_delivering_now": 0,
	//         "include_bogo_offers": true,
	//         "deeplink": "zomato://restaurant/17036389",
	//         "is_table_reservation_supported": 0,
	//         "has_table_booking": 0,
	//         "events_url": "https://www.zomato.com/pittsburgh/enrico-biscotti-pittsburgh/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1"
	//       }
	//     },
	//     {
	//       "restaurant": {
	//         "R": {
	//           "res_id": 17041562
	//         },
	//         "apikey": "752243a8ab50024dece9c7797e161222",
	//         "id": "17041562",
	//         "name": "Luke Wholey's Wild Alaskan Grille",
	//         "url": "https://www.zomato.com/pittsburgh/luke-wholeys-wild-alaskan-grille-strip-district?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
	//         "location": {
	//           "address": "2106 Penn Avenue, Pittsburgh 15222",
	//           "locality": "Strip District",
	//           "city": "Pittsburgh",
	//           "city_id": 1081,
	//           "latitude": "40.4518183000",
	//           "longitude": "-79.9828423000",
	//           "zipcode": "15222",
	//           "country_id": 216,
	//           "locality_verbose": "Strip District, Pittsburgh"
	//         },
	//         "switch_to_order_menu": 0,
	//         "cuisines": "Seafood, Cajun",
	//         "average_cost_for_two": 25,
	//         "price_range": 2,
	//         "currency": "$",
	//         "offers": [],
	//         "opentable_support": 0,
	//         "is_zomato_book_res": 0,
	//         "mezzo_provider": "OTHER",
	//         "is_book_form_web_view": 0,
	//         "book_form_web_view_url": "",
	//         "book_again_url": "",
	//         "thumb": "",
	//         "user_rating": {
	//           "aggregate_rating": "3.8",
	//           "rating_text": "Good",
	//           "rating_color": "9ACD32",
	//           "votes": "183"
	//         },
	//         "photos_url": "https://www.zomato.com/pittsburgh/luke-wholeys-wild-alaskan-grille-strip-district/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
	//         "menu_url": "https://www.zomato.com/pittsburgh/luke-wholeys-wild-alaskan-grille-strip-district/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
	//         "featured_image": "",
	//         "has_online_delivery": 0,
	//         "is_delivering_now": 0,
	//         "include_bogo_offers": true,
	//         "deeplink": "zomato://restaurant/17041562",
	//         "is_table_reservation_supported": 0,
	//         "has_table_booking": 0,
	//         "events_url": "https://www.zomato.com/pittsburgh/luke-wholeys-wild-alaskan-grille-strip-district/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1"
	//       }
	//     }
	//   ]
	// }

	retrieve: function (msg) {

		var response = [];

		msg = msg.toLowerCase();

		// Check for help
		if (msg === 'help') {
			response = [
				'`pokemon name/number` or `pokemon help` to get this message. Gen 7 or lower. Max # is ' + this.maximum + '. Uses https://pokeapi.co',
				'Add a ! after the pokemon name/number to alert the room',
				'Also available: random, missingno, pikablu, pupper, doggo'
			];
		}

		// Check API or return existing response
		if (response.length > 0) {
			return new Promise(function (resolve, reject) {
				resolve(response);
			});
		} else {
			return this.api(msg);
		}

	},

	api: function (msg) {

		var response = [];

		// console.log('1');

		return new Promise(function (resolve, reject) {

			// this._apiGetLunchSpotsByGeocode(config.config.zomato.lat, config.config.zomato.lon).then(function (lunch) {
			//
			// 	console.log('zomato lunch results!');
			// 	console.log(lunch);
			//
			// 	return resolve(lunch);
			//
			// }.bind(this), function (error) {
			//
			// 	response.push(error);
			//
			// 	return reject(response);
			//
			// }.bind(this));

			this._apiGetLunchSpotsByEntity().then(function (lunch) {

				console.log('zomato lunch results!');
				console.log(lunch);

				return resolve(lunch);

			}.bind(this), function (error) {

				response.push(error);

				return reject(response);

			}.bind(this));

		}.bind(this));

	},

	_apiGetLunchSpotsByGeocode: function (lat, lon) {

		let client = zomato.createClient({
			userKey: config.config.zomato.key
		});

		// console.log('2', client);

		return new Promise(function (resolve, reject) {

			client.getGeocode({
				city_id: 1081,
				lat: lat,
				lon: lon,
				count: 15
			}, function (err, result) {

				console.log(result, err);

				if (!err) {

					// console.log('Zomato request successful!');
					// console.log(result);

					resolve(result);

				} else {

					// console.log('Zomato request error');
					// console.log(err);

					reject(err);

				}

			});

		});

	},

	_apiGetLunchSpotsByEntity: function () {

		let client = zomato.createClient({
			userKey: config.config.zomato.key
		});

		// console.log('2', client);

		return new Promise(function (resolve, reject) {

			client.getLocationDetails({
				entity_id: '119179',
				entity_type: 'subzone'
			}, function (err, result) {

				console.log(result, err);

				if (!err) {

					// console.log('Zomato request successful!');
					// console.log(result);

					resolve(result);

				} else {

					// console.log('Zomato request error');
					// console.log(err);

					reject(err);

				}

			});

		});

	}

};
