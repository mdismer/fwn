FROM ruby:3.3.3 AS base

RUN apt-get update && apt-get install -y --no-install-recommends apt-utils cmake libpq-dev imagemagick expect libvips tcl shared-mime-info

RUN gem install bundler

# use the cache folder for bundle files (speeds up development)
# see: https://medium.com/@cristian_rivera/cache-rails-bundle-w-docker-compose-45512d952c2d
# https://bundler.io/v1.2/bundle_install.html (why vendor/cache)
# also: https://stackoverflow.com/questions/23801899/bundlergemnotfound-could-not-find-rake-10-3-2-in-any-of-the-sources
ENV RUBYOPT="-W:no-deprecated -W:no-experimental"
ENV appdir /opt/webapp
WORKDIR $appdir
COPY ./Gemfile* $appdir/

FROM base AS build-base
ENV VIPS_WARNING=0

RUN bundle install --jobs=8

COPY . $appdir

# Start the main process.
CMD ["bundle", "exec", "rails", "s"]
