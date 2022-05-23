#!/bin/sh

git filter-branch --env-filter '
if [ $GIT_COMMIT = beb9a6e6b26972e6a9a42e4d0f739efa8362fc06 ]
then
	export GIT_AUTHOR_DATE="Wed Mar 23 11:38:53 2022 -0800"
	export GIT_COMMITTER_DATE="Wed Mar 23 11:38:53 2020 -0800"
fi
'
--tag-name-filter cat -- --branches --tags


