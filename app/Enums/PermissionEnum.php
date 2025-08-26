<?php

namespace App\Enums;

enum PermissionEnum: string
{
    // General / management
    case MANAGE_CATEGORIES    = 'manage-categories';
    case MANAGE_ALL_RECIPES   = 'manage-all-recipes';

    // Recipe-related
    case CREATE_RECIPE        = 'create-recipe';
    case EDIT_OWN_RECIPE      = 'edit-own-recipe';
    case DELETE_OWN_RECIPE    = 'delete-own-recipe';
    case PUBLISH_RECIPE       = 'publish-recipe';
    case COMMENT_ON_RECIPES   = 'comment-on-recipes';

    // Category-related
    case CREATE_CATEGORY      = 'create-category';
    case DELETE_CATEGORY      = 'delete-category';
    case EDIT_CATEGORY        = 'edit-category';
}
