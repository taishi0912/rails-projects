module Api
    class PlaceholderController < ApplicationController
      def show
        width = params[:width].to_i
        height = params[:height].to_i
        
        send_file(
          Rails.root.join('app/assets/images/placeholder.jpg'),
          type: 'image/jpeg',
          disposition: 'inline'
        )
      end
    end
  end