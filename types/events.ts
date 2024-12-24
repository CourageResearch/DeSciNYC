export interface LumaEvent {
  event: {
    api_id: string;
    created_at: string;
    cover_url: string;
    name: string;
    description: string;
    description_md: string;
    series_api_id: string | null;
    start_at: string;
    duration_interval: string;
    end_at: string;
    geo_address_json: GeoAddress;
    geo_latitude: string;
    geo_longitude: string;
    url: string;
    timezone: string;
    event_type: string;
    user_api_id: string;
    visibility: string;
    meeting_url: string | null;
    zoom_meeting_url: string | null;
  };
  hosts: LumaHost[];
}

export interface LumaHost {
  api_id: string;
  email: string;
  name: string;
  avatar_url: string;
}

export interface GeoAddress {
  city: string;
  type: string;
  region: string;
  address: string;
  country: string;
  place_id: string;
  city_state: string;
  description: string;
  full_address: string;
}
