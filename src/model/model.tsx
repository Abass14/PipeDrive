
export interface Phone {
    label: string
    value: number,
    primary: boolean
}

export interface Email {
    label?: string,
    value: string,
    primary: boolean
}

export interface PictureId {
    item_type: string,
    item_id: number,
    active_flag: boolean,
    add_time: string,
    update_time: string,
    added_by_user_id: number,
    pictures: Picture,
    value: number
}

export interface Picture {
    128: string,
    512: string
}

export interface Person {
    id: number,
    company_id: number,
    owner_id: UserId,
    org_id: null | number,
    name: string,
    first_name: string,
    last_name: string,
    open_deals_count: number,
    related_open_deals_count: number,
    closed_deals_count: number,
    related_closed_deals_count: number,
    participant_open_deals_count: number,
    participant_closed_deals_count: number,
    email_messages_count: number,
    activities_count: number,
    done_activities_count: number,
    undone_activities_count: number,
    files_count: number,
    notes_count: number,
    followers_count: number,
    won_deals_count: number,
    related_won_deals_count: number,
    lost_deals_count: number,
    related_lost_deals_count: number,
    active_flag: boolean,
    phone: Array<Phone>,
    email: Array<Email>,
    first_char: string,
    update_time: string,
    add_time: string,
    visible_to: string,
    picture_id: PictureId,
    next_activity_date: null,
    next_activity_time: null,
    next_activity_id: null,
    last_activity_id: null,
    last_activity_date: null,
    last_incoming_mail_time: null,
    last_outgoing_mail_time: null,
    label: null,
    org_name: null,
    owner_name: string,
    primary_email: null,
    cc_email: string
}

export interface SuccessObject {
    success: boolean,
    data: Array<any>,
    additional_data: AdditionalData
}

export interface AdditionalData {
    activity_distribution?: any,
    pagination: Pagination
}

export interface Pagination {
    start: number,
    limit: number,
    more_items_in_collection: boolean
}

export interface Participants {
    person_id: number,
    primary_flag: boolean
}

export interface Activity { //subject type participantsList addTime dueDate
     id : number,
     company_id : number,
     user_id : number,
     done : boolean,
     type : string,
     reference_type : null,
     reference_id : null,
     conference_meeting_client : null,
     conference_meeting_url : null,
     due_date : string,
     due_time : string,
     duration : string,
     busy_flag : null,
     add_time : string,
     marked_as_done_time : string,
     last_notification_time : null,
     last_notification_user_id : null,
     notification_language_id : null,
     subject : string,
     public_description : string,
     calendar_sync_include_context : null,
     location : null,
     org_id : 1,
     person_id : 4,
     deal_id : null,
     lead_id : null,
     active_flag : true,
     update_time : string,
     update_user_id : null,
     source_timezone : null,
     rec_rule : null,
     rec_rule_extension : null,
     rec_master_activity_id : null,
     conference_meeting_id : null,
     original_start_time : null,
     note : null,
     created_by_user_id : number,
     location_subpremise : null,
     location_street_number : null,
     location_route : null,
     location_sublocality : null,
     location_locality : null,
     location_admin_area_level_1 : null,
     location_admin_area_level_2 : null,
     location_country : null,
     location_postal_code : null,
     location_formatted_address : null,
     attendees : null,
     participants : Array<Participants>
     series : null,
     is_recurring : null,
     note_clean : null,
     org_name : string,
     person_name : string,
     deal_title : null,
     lead_title : null,
     owner_name : string,
     person_dropbox_bcc : string,
     deal_dropbox_bcc : null,
     assigned_to_user_id : number,
     type_name : string,
     lead : null
}

export interface UserId {
    id: number,
    name: string,
    email: string,
    has_pic: number,
    pic_hash: null,
    active_flag: boolean,
    value: number
}

export interface PersonId {
    active_flag: boolean,
    name: string,
    email: Array<Email>,
    phone: Array<Phone>
    owner_id: number,
    value: number
}

export interface OrgId {
    name: string,
    people_count: number,
    owner_id: number,
    address: null,
    active_flag: boolean,
    cc_email:string,
    value: number
}

export interface Deals {  //owner_name, cc_email, add_time, expected_close_date, won, person_name, org_name, formatted_value, active, title
    id: number,
    creator_user_id: UserId,
    user_id: UserId,
    person_id: PersonId,
    org_id: OrgId,
    stage_id: number,
    title: string,
    value: number,
    currency: string,
    add_time: string,
    update_time: string,
    stage_change_time: string,
    active: boolean,
    deleted: boolean,
    status: string,
    probability: null,
    next_activity_date: null,
    next_activity_time: null,
    next_activity_id: null,
    last_activity_id: null,
    last_activity_date: null,
    lost_reason: null,
    visible_to: string,
    close_time: string,
    pipeline_id: number,
    won_time: string,
    first_won_time: string,
    lost_time: null,
    products_count: number,
    files_count: number,
    notes_count: number,
    followers_count: number,
    email_messages_count: number,
    activities_count: number,
    done_activities_count: number,
    undone_activities_count: number,
    participants_count: number,
    expected_close_date: string,
    last_incoming_mail_time: null,
    last_outgoing_mail_time: null,
    label: null,
    renewal_type: string,
    stage_order_nr: number,
    person_name: string,
    org_name: string,
    next_activity_subject: null,
    next_activity_type: null,
    next_activity_duration: null,
    next_activity_note: null,
    group_id: null,
    group_name: null,
    formatted_value: string,
    weighted_value: number,
    formatted_weighted_value: string,
    weighted_value_currency: string,
    rotten_time: null,
    owner_name: string,
    cc_email: string,
    org_hidden: boolean,
    person_hidden: boolean
}


