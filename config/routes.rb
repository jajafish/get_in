GetIn::Application.routes.draw do

  resources :activities do
    resources :content
  end

  devise_for :users
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # set the root route to hit the activities index (for now)
  root to: 'site#index'

end

#                 Prefix Verb   URI Pattern                                         Controller#Action
# activity_content_index GET    /activities/:activity_id/content(.:format)          content#index
#                        POST   /activities/:activity_id/content(.:format)          content#create
#   new_activity_content GET    /activities/:activity_id/content/new(.:format)      content#new
#  edit_activity_content GET    /activities/:activity_id/content/:id/edit(.:format) content#edit
#       activity_content GET    /activities/:activity_id/content/:id(.:format)      content#show
#                        PATCH  /activities/:activity_id/content/:id(.:format)      content#update
#                        PUT    /activities/:activity_id/content/:id(.:format)      content#update
#                        DELETE /activities/:activity_id/content/:id(.:format)      content#destroy
#             activities GET    /activities(.:format)                               activities#index
#                        POST   /activities(.:format)                               activities#create
#           new_activity GET    /activities/new(.:format)                           activities#new
#          edit_activity GET    /activities/:id/edit(.:format)                      activities#edit
#               activity GET    /activities/:id(.:format)                           activities#show
#                        PATCH  /activities/:id(.:format)                           activities#update
#                        PUT    /activities/:id(.:format)                           activities#update
#                        DELETE /activities/:id(.:format)                           activities#destroy
