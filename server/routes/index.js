const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/priority", require("./priority.routes"));
router.use("/categorySize", require("./categorySize.routes"));
router.use("/categorySphere", require("./categorySphere.routes"));
router.use("/task", require("./task.routes"));
router.use("/user", require("./user.routes"));


module.exports = router;
