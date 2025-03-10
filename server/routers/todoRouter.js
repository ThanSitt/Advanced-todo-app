import { pool} from '../helper/db.js';
import { Router } from 'express';
//import { emptyOrRows } from '../helper/utils.js';
import { auth } from '../helper/auth.js';
import { getTasks,postTask } from '../controllers/TaskController.js';

const router = Router();

router.get('/', getTasks);

// router.get('/',(req,res,next) => {
//     pool.query('select * from task', (error, result) => {
//         if (error) {
//             return next(error)
//         }
//         return res.status(200).json(emptyOrRows(result))
//     })
// })

router.post('/create',auth, postTask);

router.delete('/delete/:id',auth, (req,res,next) => {
    const id = parseInt(req.params.id)

    pool.query('delete from task where id = $1', 
        [id], 
        (error, result) => {
            if (error) {
                return next(error)
            }
            return res.status(200).json({id :id})
        }
    )
})

export default router;