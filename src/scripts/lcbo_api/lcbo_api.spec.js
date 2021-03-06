const lcboFetch = require('./lcbo_api_fetch');
const lcboApi = require('./lcbo_api');
const mapAdapters = require('./lcbo_api_data_adapters');
//const lcboError = require('./lcbo_api_error_handlers'); //not currently implemented

const fakeAPIResp = {"status":200,"message":null,"pager":{"records_per_page":40,"total_record_count":429,"current_page_record_count":100,"is_first_page":true,"is_final_page":false,"current_page":1,"current_page_path":"/stores?\u0026per_page=100\u0026page=1\u0026product_id=289793","next_page":2,"next_page_path":"/stores?\u0026per_page=100\u0026page=2\u0026product_id=289793","previous_page":null,"previous_page_path":null,"total_pages":5,"total_pages_path":"/stores?\u0026per_page=100\u0026page=5\u0026product_id=289793"},"product":{"id":289793,"is_dead":false,"name":"Hogsback Vintage Lager","tags":"hogsback vintage lager beer canada ontario brewing company can","is_discontinued":false,"price_in_cents":275,"regular_price_in_cents":275,"limited_time_offer_savings_in_cents":0,"limited_time_offer_ends_on":null,"bonus_reward_miles":0,"bonus_reward_miles_ends_on":null,"stock_type":"LCBO","primary_category":"Beer","secondary_category":"Lager","origin":"Canada, Ontario","package":"473 mL can","package_unit_type":"can","package_unit_volume_in_milliliters":473,"total_package_units":1,"volume_in_milliliters":473,"alcohol_content":520,"price_per_liter_of_alcohol_in_cents":1118,"price_per_liter_in_cents":581,"inventory_count":1443,"inventory_volume_in_milliliters":682539,"inventory_price_in_cents":396825,"sugar_content":null,"producer_name":"Hogsback Brewing Company","released_on":null,"has_value_added_promotion":false,"has_limited_time_offer":false,"has_bonus_reward_miles":false,"is_seasonal":false,"is_vqa":false,"is_ocb":false,"is_kosher":false,"value_added_promotion_description":null,"description":null,"serving_suggestion":null,"tasting_note":null,"updated_at":"2018-02-08T14:26:21.437Z","image_thumb_url":"https://dx5vpyka4lqst.cloudfront.net/products/289793/images/thumb.png","image_url":"https://dx5vpyka4lqst.cloudfront.net/products/289793/images/full.jpeg","varietal":"Vienna Lager","style":"Medium \u0026 Floral","tertiary_category":"Amber Lager","sugar_in_grams_per_liter":null,"clearance_sale_savings_in_cents":0,"has_clearance_sale":false,"product_no":289793}, "result":[{"id":217,"is_dead":false,"name":"Hogsback Vintage Lager","tags":"queens quay yonge 2 cooper street queen's toronto central toronto-central torontocentral m5e0b8","address_line_1":"2 Cooper Street",	"address_line_2":"Queen's Quay","city":"Toronto","postal_code":"M5E0B8","telephone":"(416) 864-6777","fax":"(416) 864-6863",	"latitude":43.643,"longitude":-79.3723,"products_count":4773,"inventory_count":160615,"inventory_price_in_cents":418527942,"inventory_volume_in_milliliters":682539,"has_wheelchair_accessability":true,"has_bilingual_services":true,	"has_product_consultant":true,	"has_tasting_bar":true,	"has_beer_cold_room":false,	"has_special_occasion_permits":true,"has_vintages_corner":true,"has_parking":true,	"has_transit_access":true,"sunday_open":660,"sunday_close":1080,"monday_open":540,"monday_close":1320,"tuesday_open":540, "tuesday_close":1320,"wednesday_open":540,"wednesday_close":1320,	"thursday_open":540,"thursday_close":1320,"friday_open":540,"friday_close":1320,"saturday_open":540,"saturday_close":1320,	"updated_at":"2018-02-08T14:15:16.387Z","quantity":0,"updated_on":"2016-07-02",	"store_no":217}]};

describe('LCBO API TESTING', function(){
	describe('test lcbo_api_fetch.js', function(){
		
		const baseUrl = 'https://junkertown.com';
		const paramsObject = {
			junkrat: 'granades',
			roadhog: 'hook',
			soldier: 'pulse rifle'
		};
		
		const targetResult = baseUrl+'?&junkrat=granades&roadhog=hook&soldier=pulse rifle';
		
		const urlTest = lcboFetch.makeUrlStringFromObject(paramsObject,baseUrl);
		
		
		describe('test makeUrlStringFromObject',function(){
			
			urlTest.should.be.deepEqual(targetResult);
			
		});
		
		describe('test makeRequestObject', function(){
			
			it('should test for a Headers Object and new Params but Header ' +
				'does not seem to be available in the current environment- research required')
			
		});
		
		describe('PRIORITY: test whole async / promise. Need to figure this out', function(){
			it('should be testing for ASYNC / FETCH ')
		});
		
	});
	
	describe('test lcbo_api.js', function(){
		const apiSets = {
			apiKey : 'MDpiM2VmYTVkMi0wOTZlLTExZTgtOTBjYi1jNzBmYzc4ZjA2MDc6bjliaGRCZjI3RUFIVUhZYThWSFhFYW9BYVdlTHlnSmVCek9j',
			beverage : {
				url : 'http://lcboapi.com/products',
				baseParams : {
					per_page: 10,
					where_not: 'is_dead, is_discontinued'
					
				}
			},
			location : {
				url : 'http://lcboapi.com/stores',
				baseParams : {
					per_page: 40,
					page:1
					
				}
			}
		};
		
		describe('apiSet should be an object', function(){
			it('should be an object', function(){
				
				lcboApi.apiSets.should.be.instanceof(Object);
			})
		});
		
		describe('testing apiSet integrity', function(){
			it('should be the same as teh ref object', function(){
				
				lcboApi.apiSets.should.be.deepEqual(apiSets)
			})
		})
		
	});
	
	describe('test lcbo_api_data_adapters.js', function(){
		
		const dataReducer = mapAdapters.dataReducer(['latitude','longitude','name', 'postal_code','telephone','inventory_volume_in_milliliters']);
		
		describe('dataReducer should be a function', function(){
			
			it('should return a function', function(){
				dataReducer.should.be.instanceof(Function);
			});
			
		});
		
		describe('dataReducer', function(){
			
			const reducedDate = [{"latitude":43.643,"longitude":-79.3723,"name":"Hogsback Vintage Lager", "postal_code":"M5E0B8","telephone":"(416) 864-6777", "inventory_volume_in_milliliters":682539}];
			
			it('should only have the correct data set', function(){
				dataReducer(fakeAPIResp.result).should.deepEqual(reducedDate)
			})
			
		})
		
	})
});

