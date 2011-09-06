require "sinatra"
# -*- coding: utf-8 -*-
require "sinatra"
require 'yajl'
require "json"
require 'mongo'


set :public ,'./'

get '/' do
  '<a href="index.html">index</a>'
end

# configure do
#     mime_type :xjson, 'text/foo'
# end


helpers do
  def request_headers
    env.inject({}){|acc, (k,v)| acc[$1.downcase] = v if k =~ /^http_(.*)/i; acc}
  end
end

db = Mongo::Connection.new.db("fml")
coll_houses = db["houses"]


get '/mongodb_test' do
    puts coll_houses
end

get '/houses/gen' do
  
  coll_houses.remove()
  
	coll_houses.create_index([["loc", Mongo::GEO2D]])
	
	#121.429247,31.22176 
	
	locations = [
	{"lat" =>121.39674, "long" => 31.266134 },
	{"lat" =>121.398195, "long" => 31.266358 },
	{"lat" =>121.400809, "long" => 31.266127 },
	{"lat" =>121.398761, "long" => 31.264969 },
	{"lat" =>121.397503, "long" => 31.264784 },
	{"lat" =>121.396506, "long" => 31.265131 },
	{"lat" =>121.397521, "long" => 31.265895 }];
	
	puts locations.count
	puts locations[0]
	0.upto(locations.count-1) do |i|
	 puts i 
		doc = {
		
			"sql_id" => "sql_id-#{i}", 
			"road" => "road-#{i}", 
			"address" => "address-#{i}", 
			"loc" => { "lat" => locations[i]["lat"], "long" => locations[i]["long"] }
		
		}
		
		coll_houses.insert(doc)
		
	end

end


#http://127.0.0.1:9393/houses/near/31.215772/121.422739

get '/houses/near/*/*' do
  
	lat 	= params[:lat]
	lang 	= params[:lang]
	 
	near_houses = coll_houses.find({"loc" => {"$near" => [lat, lang]}}, {:limit => 100})

	#near_houses.to_a
	

	#str = Yajl::Encoder.encode(near_houses)
  #puts str
  
  
  #content_type :json
  Yajl::Encoder.encode(near_houses.to_a)
  #near_houses.to_a.to_json

end


get '/houses' do
  
  houses = {  :houses => []  }

  0.upto(0) do |i|
    row = { 

      :id  => "#{i}" , 
      :title => "房子信息#{i}" ,
      :published_date => Time.now,
      :spec => "房子规格#{i}" ,
      :price => "#{i}" ,
      :phone_no => "13917447328-#{i}"   ,
      :pic_url => "http://www.familiarrealty.com/uploadfile/201102032602.jpg"  ,
      :is_sell => "1"  ,

    }
    
    houses[:houses] << row
    
  end

  
    callback = "#{params[:callback]}"

    if(callback.empty?)
        content_type 'application/x-json', :charset => 'utf-8'
        houses.to_json
    else
      content_type 'text/javascript', :charset => 'utf-8'
      "#{callback}(#{houses.to_json})"
    end
end


post '/houses' do 
  json = StringIO.new(request.env["rack.input"].read)
  parser = Yajl::Parser.new
  hash = parser.parse(json)
  
  puts hash
  #puts request.body
 # puts request.raw_post
 # puts params
 # puts headers
 # puts response
  #puts request_headers.inspect
  #puts env.inject
  # params.each do |i,v| 
  #   puts v
  # end
  
end