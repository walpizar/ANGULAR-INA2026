import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

type ValidateConfig = {
  params?: new () => object;
  body?: new () => object;
  query?: new () => object;
};

const formatErrors = (errors: any[]) =>
  errors.flatMap((e) =>
    e.constraints
      ? [{ field: e.property, constraints: e.constraints }]
      : (e.children ?? []).map((c: any) => ({
          field: `${e.property}.${c.property}`,
          constraints: c.constraints,
        })),
  );

async function validatePart(
  value: any,
  DtoClass: new () => object,
  options = { whitelist: true, forbidNonWhitelisted: true },
) {
  const dto = plainToInstance(DtoClass, value);
  const errors = await validate(dto, options);
  return { dto, errors };
}

export const validateRequest =
  (config: ValidateConfig) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allErrors: Array<{
        source: "params" | "body" | "query";
        errors: any[];
      }> = [];

      // PARAMS
      if (config.params) {
        const { dto, errors } = await validatePart(req.params, config.params);
        if (errors.length) allErrors.push({ source: "params", errors });
        else req.params = dto as any;
      }

      // QUERY
      if (config.query) {
        const { dto, errors } = await validatePart(req.query, config.query);
        if (errors.length) allErrors.push({ source: "query", errors });
        else req.query = dto as any;
      }

      // BODY
      if (config.body) {
        const { dto, errors } = await validatePart(req.body, config.body);
        if (errors.length) allErrors.push({ source: "body", errors });
        else req.body = dto as any;
      }

      if (allErrors.length) {
        return res.status(400).json({
          message: "Validación fallida",
          errors: allErrors.map((e) => ({
            source: e.source,
            details: formatErrors(e.errors),
          })),
        });
      }

      next();
    } catch {
      return res.status(500).json({ message: "Error ejecutando validaciones" });
    }
  };
