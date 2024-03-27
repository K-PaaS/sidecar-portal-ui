package org.kpaas.sidecar.portal.ui.management.users;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.kpaas.sidecar.portal.ui.common.ConstantsUrl;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Api(value = "UserController v1")
@PreAuthorize("@authSecurity.checkIsClusterAdmin()")
@Controller
public class UserController {

    private static final String BASE_URL = "sidecar/users/";


    /**
     * Admin 목록 페이지 이동(Go to the admin list page)
     *
     * @return the view
     */
    @ApiOperation(value = "Admin 목록 페이지 이동(Go to the admin list page)", nickname = "getAdminList")
    @GetMapping(value = ConstantsUrl.URI_SC_MANAGEMENTS_USERS_ADMIN )
    public String getAdminList() {
        return BASE_URL + "admin";
    }

    /**
     * Users 목록 페이지 이동(Go to the users list page)
     *
     * @return the view
     */
    @ApiOperation(value = "Users 목록 페이지 이동(Go to the users list page)", nickname = "getUsersList")
    @GetMapping(value = ConstantsUrl.URI_SC_MANAGEMENTS_USERS )
    public String getUsersList() {
        return BASE_URL + "users";
    }

    /**
     * 비활성화 Users 목록 페이지 이동(Go to the inactive users list page)
     *
     * @return the view
     */
    @ApiOperation(value = "비활성화 Users 목록 페이지 이동(Go to the inactive users list page)", nickname = "getInactiveUsersList")
    @GetMapping(value = ConstantsUrl.URI_SC_MANAGEMENTS_INACTIVE_USERS )
    public String getInactiveUsersList() {
        return BASE_URL + "inactiveUsers";
    }


    /**
     * Users 상세 페이지 이동(Go to the users details page)
     *
     * @return the view
     */
    @ApiOperation(value = "Users 상세 페이지 이동(Go to the users details page)", nickname = "getUsersDetails")
    @GetMapping(value = ConstantsUrl.URI_SC_MANAGEMENTS_USERS + ConstantsUrl.URI_CP_DETAILS)
    public String getUsersDetails() {
        return BASE_URL + "usersDetail";
    }

    /**
     * Users 수정 페이지 이동(Go to the users update page)
     *
     * @return the view
     */
    @ApiOperation(value = "Users 수정 페이지 이동(Go to the users update page)", nickname = "updateUsers")
    @GetMapping(value = ConstantsUrl.URI_SC_MANAGEMENTS_USERS + ConstantsUrl.URI_CP_UPDATE)
    public String updateUsers() { return BASE_URL + "usersUpdate"; }
}
