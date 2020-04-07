import { equal } from 'assert';
function recurse() {
    recurse();
}
export default function testModule() {
    equal(recurse(), "will fail");
}
